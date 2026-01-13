import { useCallback, useEffect, useState } from "react";
import { Config } from "../config";

export interface IAnnouncement {
    data: {
        attributes: {
            Enabled: boolean;
            Title: string;
            Message: string;
        }
    }
}

export default function Announcement() {
    const [announcement, setAnnouncement] = useState<IAnnouncement | null>(null);
    const [visible, setVisible] = useState(false);

    const getData = useCallback(async () => {
        try {
            const res = await fetch(`${Config.apiUrl}announcement?populate=deep`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setAnnouncement(data);

            // Check if announcement is enabled and user hasn't closed it this session
            if (data?.data?.attributes?.Enabled) {
                const closed = sessionStorage.getItem("announcement_closed");
                if (!closed) {
                    setVisible(true);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleClose = () => {
        setVisible(false);
        sessionStorage.setItem("announcement_closed", "true");
    };

    if (!visible || !announcement?.data?.attributes) {
        return null;
    }

    const { Title, Message } = announcement.data.attributes;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-blue bg-opacity-70 cursor-pointer"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-default max-w-lg w-full p-8 lg:p-10">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-blue hover:opacity-70 transition-all duration-300"
                    aria-label="Sluiten"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#8C7756" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="font-poppins text-blue tracking-tighter font-medium text-2xl lg:text-3xl mb-4">
                        {Title}
                    </h2>

                    {/* Message */}
                    <p className="font-openSans text-blue text-base lg:text-lg leading-[150%] mb-6 whitespace-pre-line">
                        {Message}
                    </p>

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="bg-gold text-white font-poppins font-medium py-3 px-8 rounded-full hover:opacity-70 transition-all duration-300"
                    >
                        Begrepen
                    </button>
                </div>
            </div>
        </div>
    );
}
