import { MdContentCopy } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { MdLockOutline } from 'react-icons/md';

export const STICKER_WIDGET = [
    {
        number: '210',
        text: 'Unread Email',
        icon: <MdContentCopy size={26} />,
        fontColor: '#ffffff',
        bgColor: '#7266BA',
    },
    {
        number: '210',
        text: 'characterizes as the',
        icon: <FaChevronDown size={26} />,
        fontColor: '#ffffff',
        bgColor: '#42A5F6',
    },
    {
        number: '210',
        text: 'Total Message',
        icon: <FiTrash2 size={26} />,
        fontColor: '#ffffff',
        bgColor: '#7ED320',
    },
    {
        number: '210',
        text: 'Orders Post',
        icon: <MdLockOutline size={26} />,
        fontColor: '#ffffff',
        bgColor: '#F75D81',
    },
];
