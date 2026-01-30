import React, { useState } from 'react';
import { X, Printer, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTableContext } from '@/context/TableContext';
import { useHistory } from '@/context/HistoryContext';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    tableNumber: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, tableNumber }) => {
    const { theme, formatMoney } = useTheme();
    const { getTable, stopSession } = useTableContext();
    const { addSession } = useHistory();
    const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'TRANSFER' | 'QR'>('CASH');

    if (!isOpen) return null;

    const table = getTable(tableNumber);
    if (!table) return null;

    // Calculate Fees
    const currentDurationSeconds = table.startTime ? Math.floor((Date.now() - table.startTime) / 1000) : 0;
    const hours = Math.floor(currentDurationSeconds / 3600);
    const minutes = Math.floor((currentDurationSeconds % 3600) / 60);
    const timeDisplay = `${hours}h${minutes}p`;

    // Logic: Hourly Fee calculation (simple version)
    const timeFee = Math.floor((currentDurationSeconds / 3600) * table.hourlyRate);
    const serviceFee = table.orderTotal;
    const vat = (timeFee + serviceFee) * 0.1;
    const totalAmount = timeFee + serviceFee + vat;

    const handlePayment = () => {
        // Create Session Record
        const record = {
            tableId: table.id,
            tableName: table.name,
            startTime: table.startTime || Date.now(),
            endTime: Date.now(),
            duration: currentDurationSeconds,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
            items: table.menuItems.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            date: new Date().toISOString()
        };

        addSession(record);
        stopSession(tableNumber);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in zoom-in-95">
            <div
                className="w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
                style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.primary}20` }}
            >
                {/* HEADER */}
                <div className="p-8 pb-4 flex justify-between items-start">
                    <div>
                        <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Thanh toán</div>
                        <h2 className="text-4xl font-black text-white">BÀN {tableNumber}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} className="text-zinc-400" />
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 p-8 grid grid-cols-2 gap-10">

                    {/* LEFT: Summary */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between text-zinc-400">
                                <span>Tiền giờ ({timeDisplay})</span>
                                <span className="font-mono text-white">{formatMoney(timeFee)}</span>
                            </div>
                            <div className="flex justify-between text-zinc-400">
                                <span>Dịch vụ / Menu</span>
                                <span className="font-mono text-white">{formatMoney(serviceFee)}</span>
                            </div>
                            <div className="flex justify-between text-zinc-400">
                                <span>VAT (10%)</span>
                                <span className="font-mono text-white">{formatMoney(vat)}</span>
                            </div>
                            <div className="h-[1px] bg-white/10 my-4"></div>
                            <div className="flex justify-between items-end">
                                <span className="font-bold text-lg text-white">TỔNG CỘNG</span>
                                <span className="text-3xl font-black" style={{ color: theme.primary }}>
                                    {formatMoney(totalAmount)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Methods */}
                    <div className="space-y-4">
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Phương thức thanh toán</label>

                        <button
                            onClick={() => setPaymentMethod('CASH')}
                            className={`w-full p-4 rounded-xl flex items-center gap-4 border transition-all ${paymentMethod === 'CASH' ? 'border-white' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
                            style={paymentMethod === 'CASH' ? { borderColor: theme.success, backgroundColor: `${theme.success}10` } : {}}
                        >
                            <Banknote size={24} style={{ color: paymentMethod === 'CASH' ? theme.success : theme.textMuted }} />
                            <div className="text-left">
                                <div className="font-bold text-white">Tiền mặt</div>
                                <div className="text-xs text-zinc-500">Thanh toán trực tiếp</div>
                            </div>
                        </button>

                        <button
                            onClick={() => setPaymentMethod('QR')}
                            className={`w-full p-4 rounded-xl flex items-center gap-4 border transition-all ${paymentMethod === 'QR' ? 'border-white' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
                            style={paymentMethod === 'QR' ? { borderColor: theme.primary, backgroundColor: `${theme.primary}10` } : {}}
                        >
                            <QrCode size={24} style={{ color: paymentMethod === 'QR' ? theme.primary : theme.textMuted }} />
                            <div className="text-left">
                                <div className="font-bold text-white">Quét QR</div>
                                <div className="text-xs text-zinc-500">VietQR / Momo / ZaloPay</div>
                            </div>
                        </button>

                        <button
                            onClick={() => setPaymentMethod('TRANSFER')}
                            className={`w-full p-4 rounded-xl flex items-center gap-4 border transition-all ${paymentMethod === 'TRANSFER' ? 'border-white' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
                            style={paymentMethod === 'TRANSFER' ? { borderColor: theme.secondary, backgroundColor: `${theme.secondary}10` } : {}}
                        >
                            <CreditCard size={24} style={{ color: paymentMethod === 'TRANSFER' ? theme.secondary : theme.textMuted }} />
                            <div className="text-left">
                                <div className="font-bold text-white">Chuyển khoản</div>
                                <div className="text-xs text-zinc-500">Ngân hàng điện tử</div>
                            </div>
                        </button>
                    </div>

                </div>

                {/* FOOTER */}
                <div className="p-6 bg-white/5 border-t border-white/5 flex gap-4">
                    <button className="px-6 py-4 rounded-xl font-bold text-white hover:bg-white/10 flex items-center gap-2 transition-colors">
                        <Printer size={20} />
                        In hóa đơn
                    </button>
                    <button
                        className="flex-1 py-4 rounded-xl font-bold text-lg text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        style={{ backgroundColor: theme.primary }}
                    >
                        HOÀN TẤT THANH TOÁN
                    </button>
                    {/* ACTIONS */}
                    <div className="col-span-2 flex gap-4 mt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 rounded-xl font-bold text-zinc-400 hover:bg-white/5 transition-colors border border-white/5"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            onClick={handlePayment}
                            className="flex-1 py-4 rounded-xl font-black text-xl text-zinc-900 transition-all hover:scale-[1.02] shadow-xl"
                            style={{ backgroundColor: theme.primary }}
                        >
                            XÁC NHẬN THANH TOÁN
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
