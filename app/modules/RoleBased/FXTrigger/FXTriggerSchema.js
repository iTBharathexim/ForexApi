const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FXTriggerSchema = new Schema({
    userId: {
        type: String,
    },
    Outward: {
        type: Object,
        USD: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        EUR: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        GBP: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        AUD: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        HKD: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        JPY: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        CHF: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        CNY: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        EUR: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        SGD: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        INR: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        default: {
            USD: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            EUR: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            GBP: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            AUD: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            HKD: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            JPY: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            CHF: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            CNY: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            EUR: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            SGD: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            INR: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
        }
    },
    Inward: {
        type: Object,
        USD: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        EUR: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        GBP: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        AUD: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        HKD: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        JPY: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        CHF: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        CNY: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        EUR: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        SGD: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        INR: {
            type: Object,
            TriggerRate: {
                type: String,
                default: "0"
            },
            LiveRate: {
                type: String,
                default: "0"
            },
            StatusTrigger: {
                type: Boolean,
                default: false
            }
        },
        default: {
            USD: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            EUR: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            GBP: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            AUD: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            HKD: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            JPY: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            CHF: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            CNY: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            EUR: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            SGD: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
            INR: {
                TriggerRate: "0",
                LiveRate: "0",
                StatusTrigger: false
            },
        }
    },
    deviceId: {
        type: Array,
    },
    StatusTrigger: {
        type: Boolean,
        default: false
    }
}, { collection: 'FXTrigger', timestamps: true });
const FXTrigger = mongoose.model("FXTrigger", FXTriggerSchema);
module.exports = {
    FXTriggerModel: FXTrigger,
    FXTriggerSchema: FXTriggerSchema,
    mongoose: mongoose
};