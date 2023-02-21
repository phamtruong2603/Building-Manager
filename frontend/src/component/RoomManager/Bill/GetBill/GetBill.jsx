import React, { useEffect, useState } from 'react';
import './GetBillCss.css';
import { useParams } from 'react-router-dom';
import { getBill } from '../../../auth/bill';
import { updateBillID } from '../../../auth/bill';
import { numberFormat } from '../../../auth/room';
import { Providers } from '../../../contextAPI/Provider'
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { userSlector } from '../../../../redux/reducer/userReducer';

const GetBill = () => {
    const data = useSelector(userSlector);
    const user = data.data
    const [req, setReq] = useState({})
    const { roomID } = useParams();
    useEffect(() => {
        setReq({
            year: (new Date()).getFullYear(),
            month: (new Date()).getMonth() + 1
        })
    }, [useParams()])
    const [dataBill, setDataBill] = useState([])
    const [check, setCheck] = useState(true)
    useEffect(() => {
        (async function () {
            let response = await getBill(roomID, req)
            if (response.success) {
                setDataBill(response.data)
                setCheck(false)
            } else {
                setCheck(true)
                setDataBill({})
            }
        })()
    }, [req, roomID])
    const pewMonth = () => {
        setReq({
            year: (new Date()).getFullYear(),
            month: req?.month - 1
        })
    }
    const nextMonth = () => {
        setReq({
            year: (new Date()).getFullYear(),
            month: req?.month + 1
        })
    }
    const sent = async () => {
        await updateBillID(dataBill[0]?.billID, { sent: true })
    }
    const paid = async () => {
        await updateBillID(dataBill[0]?.billID, { paid: true })
    }
    let xe = dataBill[0]?.electricNumber
    let ye = dataBill[1]?.electricNumber
    let xw = dataBill[0]?.waterBlockNumber
    let yw = dataBill[1]?.waterBlockNumber
    const sumBill = 2000000 + 40000 + 20000 + 20000 + (4000 * (ye - xe)) + (25000 * (yw - xw))
    return (
        <div className='GetBill'>
            <div className='gb-header'>
                {!check ?
                    <h3>Hóa đơn tháng {req.month}/{req.year} phòng {roomID}</h3>
                    :
                    <h3>Chưa có hóa đơn tháng {req.month}/{req.year}  phòng {roomID}</h3>
                }
                <div className='gb-history'>
                    <button onClick={pewMonth} className='button gb-button'>Tháng trước</button>
                    <button onClick={nextMonth} className='button gb-button'>Tháng sau</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Phí thu</th>
                        <th>Số đầu</th>
                        <th>Số cuối</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tiền nhà</td>
                        <td></td>
                        <td></td>
                        <td>2000000</td>
                    </tr>
                    <tr>
                        <td>Điện</td>
                        <td>
                            {check ? '...' : xe}
                        </td>
                        <td>
                            {check ? '...' : ye}
                        </td>
                        <td>
                            {check ? '...' : 4000 * (ye - xe)}
                        </td>
                    </tr>
                    <tr>
                        <td>Nước</td>
                        <td>
                            {check ? '...' : xw}
                        </td>
                        <td>
                            {check ? '...' : yw}
                        </td>
                        <td>
                            {check ? '...' : 25000 * (yw - xw)}
                        </td>
                    </tr>
                    <tr>
                        <td>Internet</td>
                        <td></td>
                        <td></td>
                        <td>40000</td>
                    </tr>
                    <tr>
                        <td>Gửi xe</td>
                        <td></td>
                        <td></td>
                        <td>20000</td>
                    </tr>
                    <tr>
                        <td>Vệ sinh </td>
                        <td></td>
                        <td></td>
                        <td>20000</td>
                    </tr>
                    <tr>
                        <td>Tổng</td>
                        <td></td>
                        <td></td>
                        <td>{check ? '...' : numberFormat.format(sumBill)}</td>
                    </tr>
                </tbody>
            </table>
            <div>
            </div>
            <div className='gb-check'>
                {user?.data?.isAdmin ?
                    <button className='button' onClick={sent}>Gửi hóa đơn</button>
                    :
                    <button className='button' onClick={paid}>Đóng tiền</button>}
            </div>
        </div>
    )
}

export default GetBill