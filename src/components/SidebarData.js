import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';

export const SidebarData = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text1'
        
    },
    {
        title: 'Giỏ hàng',
        path: '/products',
        icon: <FaIcons.FaShoppingCart />,
        cName: 'nav-text1'
    },
    {
        title: 'Sản phẩm',
        path: '/products',
        icon: <FaIcons.FaThList />,
        cName: 'nav-text1'
    },
    {
        title: 'Kho',
        path: '/khotong',
        icon: <FaIcons.FaWarehouse />,
        cName: 'nav-text1'
    },
    {
        title: 'Đăng nhập',
        path: '/dangnhap',
        icon: <FaIcons.FaUserAlt />,
        cName: 'nav-text1'
    },
    {
        title: 'Đăng ký',
        path: '/dangky',
        icon: <BiIcons.BiEditAlt  />,
        cName: 'nav-text1'
    },
        // {
        // title: 'Overview',
        // path: '/overview',
        // icon: <AiIcons.AiFillHome />,
        // iconClosed: <RiIcons.RiArrowDownSFill />,
        // iconOpened: <RiIcons.RiArrowUpSFill />,

        // subNav: [
        //     {
        //         title: 'Users',
        //         path: '/overview/users',
        //         icon: <IoIcons.IoIosPaper />
        //     },
        //     {
        //         title: 'Revenue',
        //         path: '/overview/revenue',
        //         icon: <IoIcons.IoIosPaper />
        //     }
        // ]
    // },
];




// export const SidebarData = [
//     {
//         title: 'Overview',
//         path: '/overview',
//         icon: <AiIcons.AiFillHome />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,

//         subNav: [
//             {
//                 title: 'Users',
//                 path: '/overview/users',
//                 icon: <IoIcons.IoIosPaper />
//             },
//             {
//                 title: 'Revenue',
//                 path: '/overview/revenue',
//                 icon: <IoIcons.IoIosPaper />
//             }
//         ]
//     },
//     {
//         title: 'Reports',
//         path: '/reports',
//         icon: <IoIcons.IoIosPaper />,
//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,

//         subNav: [
//             {
//                 title: 'Reports',
//                 path: '/reports/reports1',
//                 icon: <IoIcons.IoIosPaper />,
//                 cName: 'sub-nav'
//             },
//             {
//                 title: 'Reports 2',
//                 path: '/reports/reports2',
//                 icon: <IoIcons.IoIosPaper />,
//                 cName: 'sub-nav'
//             },
//             {
//                 title: 'Reports 3',
//                 path: '/reports/reports3',
//                 icon: <IoIcons.IoIosPaper />
//             }
//         ]
//     },
//     {
//         title: 'Products',
//         path: '/products',
//         icon: <FaIcons.FaCartPlus />
//     },
//     {
//         title: 'Team',
//         path: '/team',
//         icon: <IoIcons.IoMdPeople />
//     },
//     {
//         title: 'Messages',
//         path: '/messages',
//         icon: <FaIcons.FaEnvelopeOpenText />,

//         iconClosed: <RiIcons.RiArrowDownSFill />,
//         iconOpened: <RiIcons.RiArrowUpSFill />,

//         subNav: [
//             {
//                 title: 'Message 1',
//                 path: '/messages/message1',
//                 icon: <IoIcons.IoIosPaper />
//             },
//             {
//                 title: 'Message 2',
//                 path: '/messages/message2',
//                 icon: <IoIcons.IoIosPaper />
//             }
//         ]
//     },
//     {
//         title: 'Support',
//         path: '/support',
//         icon: <IoIcons.IoMdHelpCircle />
//     }
// ];
