'use client';

import { X } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export function ProjectWarning() {
    useEffect(() => {
        const dismissed = localStorage.getItem('warningDismissed');

        if (!dismissed) {
            const toastId = toast(
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <span className="text-amber-900 font-bold">Experimental Project</span>
                        </div>
                        <button
                            onClick={() => {
                                toast.dismiss(toastId);
                                localStorage.setItem('warningDismissed', 'true');
                            }}
                        >
                            <X className="h-4 w-4 text-amber-700" />
                        </button>
                    </div>
                    <div className="text-amber-800 leading-relaxed">
                        If you find any issues, please report them to{' '}
                        <a
                            href="https://discord.com/users/801790169673498664"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-amber-700 underline underline-offset-4 
                            hover:text-amber-900 transition-colors duration-200"
                        >
                            @LsCo
                        </a> on Discord.
                        <br /><br />
                        Thank you for your understanding and support.
                    </div>
                </div >,
                {
                    duration: Infinity,
                    className: "bg-gradient-to-r from-amber-50 to-yellow-50 border-yellow-200",
                    position: "bottom-right",
                }
            );
        } else {
            localStorage.setItem('warningDismissed', 'false');
        }
    }, []);

    return null;
}
