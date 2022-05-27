import React, { useEffect, useState } from 'react';
import './GetBillCss.css';
import { useParams } from 'react-router-dom';
import { getBill } from '../../../auth/bill';
import { numberFormat } from '../../../auth/room';

const GetBill = () => {
    const req = {
        year: (new Date()).getFullYear(),
        month: (new Date()).getMonth() + 1
    }
    const { roomID } = useParams();
    const [dataBill, setDataBill] = useState([])
    const [check, setCheck] = useState(false)
    useEffect(() => {
        (async function () {
            let response = await getBill(roomID, req)
            if (response.success) {
                setDataBill(response.data)
            } else {
                setCheck(!check)
            }
        })()
    }, [])

    //
    let xe = dataBill[0]?.electricNumber
    let ye = dataBill[1]?.electricNumber
    let xw = dataBill[0]?.waterBlockNumber
    let yw = dataBill[1]?.waterBlockNumber
    const sumBill = 2000000 + 40000 + 20000 + 20000 + (4000 * (ye - xe)) + (25000 * (yw - xw))
    return (
        <div>
            {check ?
                <div>
                    null
                </div>
                :
                <div className='GetBill'>
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
                                <td>{xe}</td>
                                <td>{ye}</td>
                                <td>{4000 * (ye - xe)}</td>
                            </tr>
                            <tr>
                                <td>Nước</td>
                                <td>{xw}</td>
                                <td>{yw}</td>
                                <td>{25000 * (yw - xw)}</td>
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
                                <td>{numberFormat.format(sumBill)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                    </div>
                </div>
            }</div>
    )
}

export default GetBill