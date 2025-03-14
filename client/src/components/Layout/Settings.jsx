import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { BsMoon, BsSun } from "react-icons/bs";
import toast from "react-hot-toast";
import Header from "./Header";

const Settings = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <>
            <Header />

            <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
                    Settings
                </h2>

                {/* Dark Mode Toggle */}
                <div className="flex justify-between items-center py-4 border-b border-gray-300 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-gray-100">Dark Mode</span>
                    <Switch
                        checked={darkMode}
                        onChange={setDarkMode}
                        className={`${darkMode ? "bg-green-600" : "bg-gray-400"
                            } relative inline-flex h-6 w-11 items-center rounded-full transition duration-300`}
                    >
                        <span className="sr-only">Enable dark mode</span>
                        <span
                            className={`${darkMode ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition duration-300`}
                        />
                    </Switch>
                </div>

                {/* Notifications Toggle */}
                <div className="flex justify-between items-center py-4">
                    <span className="text-gray-900 dark:text-gray-100">Enable Notifications</span>
                    <button
                        onClick={() => toast.success("Notifications Enabled!")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Enable
                    </button>
                </div>
            </div>
        </>
    );
};

export default Settings;
