import React, { useState } from 'react';
import { Upload, AlertCircle, FileJson, X, CheckCircle2 } from 'lucide-react';

const SpecUploader = ({ onSpecContent, error }) => {
    const [activeTab, setActiveTab] = useState('upload');
    const [pastedCode, setPastedCode] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const validateAndNotify = (content, fileName = null) => {
        if (!content) {
            onSpecContent('');
            return;
        }

        try {
            // Basic check for JSON
            if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
                JSON.parse(content);
            }
            onSpecContent(content, null);
        } catch (e) {
            if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
                onSpecContent(content, "Invalid JSON format: " + e.message);
            } else {
                onSpecContent(content, null);
            }
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile({
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            lastModified: new Date(file.lastModified).toLocaleDateString()
        });

        const reader = new FileReader();
        reader.onload = (event) => {
            validateAndNotify(event.target.result, file.name);
        };
        reader.readAsText(file);
    };

    const clearFile = (e) => {
        e.preventDefault();
        setSelectedFile(null);
        onSpecContent('', null);
    };

    const handlePasteChange = (e) => {
        const content = e.target.value;
        setPastedCode(content);
        validateAndNotify(content);
    };

    return (
        <div className="bg-card rounded-xl p-6 border border-border shadow-lg transition-all duration-300 hover:shadow-primary/5">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Upload className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-white">OpenAPI Specification</h2>
            </div>

            <div className="flex gap-4 mb-6 border-b border-border">
                <button
                    onClick={() => setActiveTab('upload')}
                    className={`pb-2 px-1 text-sm font-medium transition-colors relative ${activeTab === 'upload' ? 'text-primary' : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    Upload File
                    {activeTab === 'upload' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('paste')}
                    className={`pb-2 px-1 text-sm font-medium transition-colors relative ${activeTab === 'paste' ? 'text-primary' : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    Paste Spec
                    {activeTab === 'paste' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                </button>
            </div>

            {activeTab === 'upload' ? (
                selectedFile ? (
                    <div className="border border-border rounded-xl p-4 bg-slate-900/50 flex items-center gap-4 group">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <FileJson className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-slate-100 truncate">{selectedFile.name}</p>
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                            <p className="text-xs text-slate-500">{selectedFile.size} • Last modified {selectedFile.lastModified}</p>
                        </div>
                        <button
                            onClick={clearFile}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Remove file"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="relative group">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer bg-slate-800/20 group-hover:bg-slate-800/40 group-hover:border-primary/50 transition-all">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 mb-3 text-slate-400 group-hover:text-primary transition-colors" />
                                <p className="mb-2 text-sm text-slate-300">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">JSON or YAML files only</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept=".json,.yaml,.yml"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </div>
                )
            ) : (
                <textarea
                    value={pastedCode}
                    onChange={handlePasteChange}
                    placeholder="Paste your OpenAPI spec (JSON or YAML) here..."
                    className="w-full h-40 bg-slate-900/50 border border-border rounded-xl p-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all custom-scrollbar text-slate-300"
                />
            )}

            {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                        <p className="font-semibold">Spec Issue</p>
                        <p className="opacity-80">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpecUploader;
