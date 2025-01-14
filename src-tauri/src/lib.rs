use crate::zbus::Error;
use rand::Rng;
use serde_json::json;
use tauri::AppHandle;
use zbus_systemd::zbus;
use libcrypt_rs::{Crypt, Encryptions};
use std::time::{SystemTime, UNIX_EPOCH};

#[tauri::command]
async fn greet(app: AppHandle, username: &str, password: &str, timezone: &str, locale: &str) -> Result<(), ()> {
    create_home(username, password, locale).await.expect("Could not create home");
    set_timezone(timezone).await.expect("Could not set Timezone");
    set_hostname().await.expect("Could not set hostname");
    set_locale(locale).await.expect("Could not set locale");

    AppHandle::exit(&app, 0);
    Ok(())
}

async fn create_home(username: &str, password: &str, locale: &str) -> Result<(), Error> {
    let conn = zbus::Connection::system().await.unwrap();
    let manager = zbus_systemd::home1::ManagerProxy::new(&conn).await.unwrap();

    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards");
    let time = now.as_micros();

    let user_record = json!({
        "userName": username.to_lowercase(),
        "realName": username,
        "disposition": "regular",
        "shell": "/usr/bin/bash",
        "preferredLanguage": locale,
        "storage": "luks",
        "memberOf": ["wheel", "users", "libvirt", "sambashare", "lpadmin", "lp", "sudo"],
        "lastChangeUSec" : time,
        "lastPasswordChangeUSec" : time,
        "enforcePasswordPolicy" : false,
        "fileSystemType": "btrfs",
        "luksDiscard": true,
        "luksOfflineDiscard": true,
        "autoResizeMode": "shrink-and-grow",
        "preferredSessionType": "wayland",
        "secret": {
            "password": [ password ],
        },
        "privileged": {
            "hashedPassword": [ hash_password(password) ]
        }
    });
    // Theres probably a better way to do this.
    let json_user_record = serde_json::to_string(&user_record).unwrap();

    manager.create_home(json_user_record).await
}

fn hash_password(password: &str) -> String {
    // Create new instance of Crypt object.
	let mut engine = Crypt::new();
 
	// WARN: Yescrypt causes segmentation fault.
	engine.gen_salt(Encryptions::Sha512).expect("Salt generation failed");
 	
	engine.encrypt(password.to_string()).expect("Encryption failed");
    engine.encrypted
}

// Sets the hostname
async fn set_hostname() -> Result<(), Error> {
    let conn = zbus::Connection::system().await.unwrap();
    let manager = zbus_systemd::hostname1::HostnamedProxy::new(&conn)
        .await
        .unwrap();

    let hostname = "TimelessOS-".to_owned() + &rand::thread_rng().gen_range(100..999).to_string();

    manager.set_static_hostname(hostname, true).await
}

// Sets the locale
async fn set_locale(locale: &str) -> Result<(), Error> {
    let conn = zbus::Connection::system().await.unwrap();
    let manager = zbus_systemd::locale1::LocaledProxy::new(&conn)
        .await
        .unwrap();

    let mut locale_vec : Vec<String> = Vec::new();
    locale_vec.push(locale.to_string());
    
    manager.set_locale(locale_vec, true).await
}

// Sets the timezone
async fn set_timezone(timezone: &str) -> Result<(), Error> {
    let conn = zbus::Connection::system().await.unwrap();
    let manager = zbus_systemd::timedate1::TimedatedProxy::new(&conn)
        .await
        .unwrap();
    manager.set_ntp(true, true).await.unwrap();
    manager
        .set_timezone(timezone.to_string(), true)
        .await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
