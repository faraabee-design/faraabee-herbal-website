import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import { ShoppingBag, Phone, MapPin, Calendar, Clock } from 'lucide-react';

interface AdminOrdersProps {
  onNotify: (msg: string) => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ onNotify }) => {
  const { orders, updateOrderStatus } = useStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status);
      onNotify(`Order status updated to ${status}`);
    } catch {
      onNotify('Failed to update order status');
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'cancelled':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'pending':
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-[#AFC7A5]/30">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#183F32]">Customer Orders</h2>
          <p className="text-xs text-[#26312B]/70 mt-0.5">
            Review apothecary orders, dispatch status, and customer shipping destinations.
          </p>
        </div>
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs border border-[#AFC7A5]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white cursor-pointer"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-[#AFC7A5]/40 text-[#26312B]/60">
          <ShoppingBag className="w-10 h-10 mx-auto text-[#183F32]/40 mb-3" />
          <p className="font-semibold text-sm text-[#183F32]">No Orders Yet</p>
          <p className="text-xs mt-1 text-[#26312B]/60">
            When customers place orders via checkout, they will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-5 border border-[#AFC7A5]/30 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              {/* Order Info & Customer Details */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#183F32] bg-[#FAF9F3] px-2.5 py-1 rounded-lg border border-[#AFC7A5]/30">
                    {order.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <span className="text-[11px] text-[#26312B]/50 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#26312B]/50 block text-[10px] uppercase font-bold">
                      Customer
                    </span>
                    <span className="font-semibold text-[#183F32]">{order.customerName}</span>
                    {order.customerEmail && (
                      <span className="block text-[#26312B]/70">{order.customerEmail}</span>
                    )}
                    <span className="text-[#183F32] flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" />
                      {order.customerPhone}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#26312B]/50 block text-[10px] uppercase font-bold">
                      Shipping Address
                    </span>
                    <span className="text-[#26312B]/80 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#183F32] shrink-0 mt-0.5" />
                      <span>
                        {order.shippingAddress}
                        {order.city ? `, ${order.city}` : ''}
                      </span>
                    </span>
                    {order.notes && (
                      <p className="mt-1 text-[11px] italic text-[#26312B]/60">
                        Note: &quot;{order.notes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Items Breakdown */}
                <div className="pt-3 border-t border-[#AFC7A5]/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#183F32] block mb-2">
                    Formulations Ordered:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-1.5 pr-3 bg-[#FAF9F3] rounded-xl border border-[#AFC7A5]/25 text-xs"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-7 h-7 rounded-lg object-cover bg-white"
                          />
                        )}
                        <span className="font-medium text-[#183F32]">{item.name}</span>
                        <span className="text-[#26312B]/60 text-[11px]">× {item.quantity}</span>
                        <span className="font-bold text-[#183F32] text-[11px]">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total & Status Selector */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 border-t md:border-t-0 md:border-l border-[#AFC7A5]/20 pt-3 md:pt-0 md:pl-6 shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase font-bold text-[#26312B]/50 block">
                    Total Amount
                  </span>
                  <span className="text-xl font-serif font-bold text-[#183F32]">
                    Rs. {order.total.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-800 block">Cash on Delivery</span>
                </div>

                <div className="w-40">
                  <label className="text-[10px] uppercase font-bold text-[#183F32] block mb-1">
                    Update Status
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#AFC7A5]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F32] bg-white cursor-pointer font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
