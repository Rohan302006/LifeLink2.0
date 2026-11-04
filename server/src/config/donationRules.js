// Days a donor must wait after the last VERIFIED donation of each type.
export const COOLDOWN_DAYS = {
    WHOLE_BLOOD: 90,
    PLASMA: 14,
    PLATELETS: 7,
};

// A duplicate request is the same patient + hospital + blood group within this window.
export const DUPLICATE_WINDOW_HOURS = 24;