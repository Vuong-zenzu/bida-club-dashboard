import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { THEME_COLORS, THEME_EFFECTS } from '@/config/theme.config';

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    sourceTable: string;
}

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, sourceTable }) => {
    const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

    // Mock available tables
    const availableTables = ['03', '06', '09', '11'];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div
                className="w-full max-w-lg rounded-[24px] p-6 m-4 relative shadow-2xl"
                style={{ backgroundColor: THEME_COLORS.bgCard, border: `1px solid ${THEME_COLORS.primary}40` }}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-white">Chuyển Bàn</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} className="text-zinc-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="text-center">
                        <div className="text-zinc-500 text-sm mb-2 uppercase font-semibold">Từ bàn</div>
                        <div className="text-4xl font-extrabold text-white bg-zinc-800 w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10">
                            {sourceTable}
                        </div>
                    </div>

                    <ArrowRight size={32} className="text-zinc-600 animate-pulse" />

                    <div className="text-center">
                        <div className="text-zinc-500 text-sm mb-2 uppercase font-semibold">Đến bàn</div>
                        <div
                            className="text-4xl font-extrabold w-20 h-20 rounded-2xl flex items-center justify-center border transition-all"
                            style={{
                                backgroundColor: selectedTarget ? `${THEME_COLORS.primary}20` : 'transparent',
                                borderColor: selectedTarget ? THEME_COLORS.primary : 'rgba(255,255,255,0.1)',
                                color: selectedTarget ? THEME_COLORS.primary : 'rgba(255,255,255,0.2)'
                            }}
                        >
                            {selectedTarget || '?'}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-zinc-400 text-sm mb-3 font-semibold uppercase">Chọn bàn trống</label>
                    <div className="grid grid-cols-4 gap-3">
                        {availableTables.map(t => (
                            <button
                                key={t}
                                onClick={() => setSelectedTarget(t)}
                                className={`
                  h-12 rounded-xl font-bold transition-all relative overflow-hidden
                  ${selectedTarget === t
                                        ? 'ring-2 ring-offset-2 ring-offset-zinc-900 scale-105'
                                        : 'hover:bg-white/5 bg-zinc-800/50 border border-white/10'
                                    }
                `}
                                style={{
                                    backgroundColor: selectedTarget === t ? THEME_COLORS.primary : undefined,
                                    ringColor: selectedTarget === t ? THEME_COLORS.primary : undefined,
                                }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl font-bold text-zinc-400 hover:bg-white/5 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        disabled={!selectedTarget}
                        className="flex-1 py-3 rounded-xl font-bold text-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: selectedTarget ? THEME_COLORS.primary : 'rgba(255,255,255,0.1)',
                            color: selectedTarget ? THEME_COLORS.bgPrimary : 'rgba(255,255,255,0.3)'
                        }}
                    >
                        Xác nhận
                    </button>
                </div>

            </div>
        </div>
    );
};
