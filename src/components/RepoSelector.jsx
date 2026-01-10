import React, { useState } from 'react';
import { FolderOpen, MapPin, ExternalLink, Loader2 } from 'lucide-react';

const RepoSelector = ({ repoPath, setRepoPath }) => {
    const [isOpening, setIsOpening] = useState(false);

    const openNativePicker = async () => {
        setIsOpening(true);
        try {
            const response = await fetch('http://localhost:8000/open-picker');
            if (response.ok) {
                const data = await response.json();
                if (data.path) {
                    setRepoPath(data.path);
                }
            }
        } catch (err) {
            console.error("Failed to open native folder picker", err);
        } finally {
            setIsOpening(false);
        }
    };

    return (
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg transition-all duration-300 hover:shadow-primary/5">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <FolderOpen className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-white">Test Repository</h2>
            </div>

            <p className="text-sm text-slate-400 mb-6">
                Specify the local directory where your generated tests should be saved.
            </p>

            <div className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                        type="text"
                        value={repoPath}
                        onChange={(e) => setRepoPath(e.target.value)}
                        placeholder="/path/to/your/project/tests"
                        className="block w-full pl-9 pr-3 py-3 bg-slate-900/50 border border-border rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-100"
                    />
                </div>

                <button
                    onClick={openNativePicker}
                    disabled={isOpening}
                    className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-border hover:border-slate-500 text-slate-200 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all group"
                >
                    {isOpening ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            <span>Waiting for Selection...</span>
                        </>
                    ) : (
                        <>
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                            <span>Select Location (Native Dialog)</span>
                        </>
                    )}
                </button>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                        Clicking the button will open the standard macOS folder selection window. The path will be automatically populated here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RepoSelector;
