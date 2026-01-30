export interface InvoiceItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export type PaymentMethod = 'CASH' | 'TRANSFER' | 'QR';

export interface SessionRecord {
    id: string;
    tableId: string;
    tableName: string;
    startTime: number;
    endTime: number;
    duration: number; // in seconds
    totalAmount: number;
    paymentMethod: PaymentMethod;
    items: InvoiceItem[];
    date: string; // ISO Date string for grouping/sorting
}
