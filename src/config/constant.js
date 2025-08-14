const constants = {
    global_loader_time_out: 1000,
    prescription_file_size_mb: 3,
    prescription_file_size_bytes: 3 * 1024 * 1024,
    BLUE_SCREEN: "BLUE_SCREEN",
    FRAME_ONLY: "FRAME_ONLY",
    ZERO_POWER: "ZERO_POWER",
    SUN_GLASSES: "SUN_GLASSES",
    SUPPORTED_FORMATS_FILE: ['image/jpeg', 'image/png', 'application/pdf'],
    please_login_first_message: "Please Login First",
    select_box_style: {
        MenuProps : {
            PaperProps: {
                style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 100,
                },
            },
            disableScrollLock: false,
        }
    },
    heart_fill_color: "#d2ab66",
};



export default constants;
