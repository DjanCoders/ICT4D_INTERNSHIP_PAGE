import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
// import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import React from 'react';
import { Link } from 'react-router-dom';
import './itemlists.scss';

function ItemLists({ type }) {
    let data;

    // Dynamicaly change the ui content
    switch (type) {
        case 'totalApplicants':
            data = {
                title: 'TOTAL APPLICANTS',
                count: 200,
                icon: (
                    <PermIdentityIcon
                        style={{
                            color: '#4E9F3D',
                            backgroundColor: '#E9F5DB',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all applicants',
                linkto: '/applicants',
            };
            break;
        case 'approvedApplicants':
            data = {
                title: 'APPROVED APPLICANTS',
                count: 50,
                icon: (
                    <HowToRegOutlinedIcon
                        style={{
                            color: '#1E5128',
                            backgroundColor: '#D8E9A8',
                        }}
                        className="icon"
                    />
                ),
                link: 'View approved applicants',
                linkto: '/applicants/approved',
            };
            break;
        case 'pendingApplicants':
            data = {
                title: 'PENDING APPLICATIONS',
                count: 120,
                icon: (
                    <PendingActionsOutlinedIcon
                        style={{
                            color: '#FCA652',
                            backgroundColor: '#FFF5E4',
                        }}
                        className="icon"
                    />
                ),
                link: 'View pending applications',
                linkto: '/applicants/pending',
            };
            break;
        case 'rejectedApplicants':
            data = {
                title: 'REJECTED APPLICANTS',
                count: 30,
                icon: (
                    <HighlightOffOutlinedIcon
                        style={{
                            color: '#B91646',
                            backgroundColor: '#FFEBEB',
                        }}
                        className="icon"
                    />
                ),
                link: 'View rejected applicants',
                linkto: '/applicants/rejected',
            };
            break;
        default:
            break;
    }

    return (
        <div className="item_listss">
            <div className="name">
                <p>{data.title}</p>
                <span className="persentage positive">
                    <KeyboardArrowUpIcon />
                   {(data.count/200)*100} %
                </span>
            </div>

            <div className="counts">
                {data.isMoney && <AttachMoneyOutlinedIcon />}
                {data.count}
            </div>

            <div className="see_item">
                <Link to={data.linkto}>
                    <p>{data.link}</p>
                </Link>
                {data.icon}
            </div>
        </div>
    );
}

export default ItemLists;