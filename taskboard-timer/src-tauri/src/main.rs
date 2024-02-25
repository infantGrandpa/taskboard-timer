// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{command, App, Manager};
use std::process::Command;

#[command]
fn increment_count(current_count: i32) -> Result<String, String> {
    // Construct the command to call the Python script with the current count as an argument
    let output = Command::new("python")
        .arg("../scripts/rand_gen.py") // Make sure the path to your script is correct
        .arg(current_count.to_string()) // Pass the current count to the Python script
        .output()
        .expect("Failed to execute command");

    if output.status.success() {
        // If the script ran successfully, capture its output and return it
        let result = String::from_utf8_lossy(&output.stdout);
        Ok(result.to_string())
    } else {
        // If the script failed, return an error
        Err(String::from_utf8_lossy(&output.stderr).into_owned())
    }
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![increment_count])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
