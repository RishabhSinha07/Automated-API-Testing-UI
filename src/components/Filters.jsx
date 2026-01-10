import React from 'react';
import { Search, Filter as FilterIcon, Info, CheckCircle2, RefreshCcw, FastForward, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Filters = ({ searchTerm, setSearchTerm, filterAction, setFilterAction }) => {
    const [showLegend, setShowLegend] = React.useState(false);
    const actions = ['All', 'Created', 'Updated', 'Skipped', 'Deleted'];

    const legend = [
        { label: 'Created', icon: CheckCircle2, color: 'text-green-400', desc: 'New endpoint found. Generated a fresh test file.' },
        { label: 'Updated', icon: RefreshCcw, color: 'text-blue-400', desc: 'Schema change detected. Updated payloads and assertions.' },
        { label: 'Skipped', icon: FastForward, color: 'text-slate-400', desc: 'No changes in spec. Existing file is up to date.' },
        { label: 'Deleted', icon: Trash2, color: 'text-red-400', desc: 'Endpoint removed from spec. File marked as obsolete.' },
    ];

    return (
        <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-500" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by endpoint or filename..."
                        className="block w-full pl-10 pr-3 py-2 bg-slate-900/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-200"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-900/50 border border-border rounded-lg p-1">
                        {actions.map((action) => (
                            <button
                                key={action}
                                onClick={() => setFilterAction(action)}
                                className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${filterAction === action
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setShowLegend(!showLegend)}
                        className={`p-2 rounded-lg border transition-all ${showLegend ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-900/50 border-border text-slate-500 hover:text-slate-300'}`}
                    >
                        <Info className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showLegend && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-900/50 border border-border rounded-xl mb-4">
                            {legend.map((item) => (
                                <div key={item.label} className="flex gap-3 items-start p-2">
                                    <item.icon className={`w-4 h-4 shrink-0 mt-0.5 ${item.color}`} />
                                    <div>
                                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${item.color}`}>{item.label}</p>
                                        <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Filters;
