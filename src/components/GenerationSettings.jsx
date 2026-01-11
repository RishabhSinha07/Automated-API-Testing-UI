import React, { useState } from 'react';
import { Globe, Shield, Plus, X, Key } from 'lucide-react';

const GenerationSettings = ({ serverUrl, setServerUrl, tokens, setTokens }) => {
    const [newScheme, setNewScheme] = useState('');
    const [newToken, setNewToken] = useState('');

    const addToken = () => {
        if (newScheme && newToken) {
            setTokens({ ...tokens, [newScheme]: newToken });
            setNewScheme('');
            setNewToken('');
        }
    };

    const removeToken = (scheme) => {
        const newTokens = { ...tokens };
        delete newTokens[scheme];
        setTokens(newTokens);
    };

    return (
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg transition-all duration-300 hover:shadow-primary/5">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-white">Environment Settings</h2>
            </div>

            <p className="text-sm text-slate-400 mb-6">
                Configure the target server and security credentials for your tests.
            </p>

            <div className="space-y-6">
                {/* Server URL */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                        Base Server URL
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-4 w-4 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            value={serverUrl}
                            onChange={(e) => setServerUrl(e.target.value)}
                            placeholder="https://api.example.com/v1"
                            className="block w-full pl-9 pr-3 py-3 bg-slate-900/50 border border-border rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-100"
                        />
                    </div>
                </div>

                {/* Tokens */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
                        Security Tokens
                    </label>
                    <div className="space-y-3">
                        {Object.entries(tokens).map(([scheme, token]) => (
                            <div key={scheme} className="flex gap-2 items-center bg-slate-800/50 p-2 rounded-lg border border-border">
                                <div className="flex-1 min-w-0">
                                    <div className="text-[10px] font-bold text-primary uppercase">{scheme}</div>
                                    <div className="text-xs text-slate-300 truncate font-mono">{token}</div>
                                </div>
                                <button
                                    onClick={() => removeToken(scheme)}
                                    className="p-1 hover:bg-red-500/20 text-slate-500 hover:text-red-400 rounded transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}

                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                    <Shield className="h-3 w-3 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    value={newScheme}
                                    onChange={(e) => setNewScheme(e.target.value)}
                                    placeholder="Scheme (e.g. Bearer)"
                                    className="block w-full pl-7 pr-2 py-2 bg-slate-900/80 border border-border rounded-lg text-[11px] placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all text-slate-100"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                    <Key className="h-3 w-3 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    value={newToken}
                                    onChange={(e) => setNewToken(e.target.value)}
                                    placeholder="Token Value"
                                    className="block w-full pl-7 pr-2 py-2 bg-slate-900/80 border border-border rounded-lg text-[11px] placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all text-slate-100"
                                />
                            </div>
                        </div>
                        <button
                            onClick={addToken}
                            disabled={!newScheme || !newToken}
                            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-border transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus className="w-3 h-3" />
                            <span>Add Security Token</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerationSettings;
