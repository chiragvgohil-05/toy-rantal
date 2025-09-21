// src/components/Toast.jsx
import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 2000,
                style: {
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "#fff",
                    color: "#333",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                },
                success: {
                    style: {
                        background: "#4ade80",
                        color: "#fff",
                    },
                },
                error: {
                    style: {
                        background: "#f87171",
                        color: "#fff",
                    },
                },
                // Optional: add a close button
                render: (t) => (
                    <div className="flex justify-between items-center">
                        <span>{t.message}</span>
                        <button
                            className="ml-4 font-bold text-white"
                            onClick={() => t.dismiss && t.dismiss(t.id)}
                        >
                            ×
                        </button>
                    </div>
                ),
            }}
        />
    );
};

export default Toast;
