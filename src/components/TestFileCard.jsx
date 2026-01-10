import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileCode, Clock, Tag, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActionBadge = ({ action }) => {
    const styles = {
        Created: 'bg-green-500/10 text-green-400 border-green-500/20',
        Updated: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        Skipped: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        Deleted: 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    return (
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${styles[action] || styles.Skipped}`}>
            {action}
        </span>
    );
};

const TestFileCard = ({ file }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(file.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-600 mb-4">
            <div
                className="p-4 flex items-center gap-4 cursor-pointer select-none"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className={`p-2 rounded-lg transition-colors ${isExpanded ? 'bg-primary/20 text-primary' : 'bg-slate-800 text-slate-400'}`}>
                    <FileCode className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-100 truncate">{file.fileName}</h3>
                        <ActionBadge action={file.action} />
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            <span>{file.endpointId}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{file.timestamp}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-500/20 text-green-400' : 'hover:bg-slate-800 text-slate-500 hover:text-slate-300'}`}
                        title="Copy Code"
                    >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button className="p-1 px-2 text-slate-500 hover:text-slate-300 transition-colors">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="p-4 pt-0 border-t border-border bg-slate-900/40">
                            <div className="mt-4 rounded-lg bg-[#0d1117] overflow-hidden border border-slate-800">
                                <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                    <span>Python Source</span>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                                    </div>
                                </div>
                                <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono leading-relaxed custom-scrollbar">
                                    <code>
                                        {file.code.split('\n').map((line, i) => (
                                            <div key={i} className={line.includes('AUTO-GENERATED') ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}>
                                                <span className="inline-block w-8 text-slate-600 select-none">{i + 1}</span>
                                                {line}
                                            </div>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TestFileCard;
