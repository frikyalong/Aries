import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;
export default {
    formateShortDate(time) {
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    },
    formateDate(time) {
        if (!time) return '';
        let date = new Date(time);
        return (
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate() +
            ' ' +
            date.getHours() +
            ':' +
            date.getMinutes() +
            ':' +
            date.getSeconds()
        );
    },
    pagination(data, callback) {
        return {
            onChange: current => {
                callback(current);
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total_count,
            showTotal: () => {
                return `共${data.result.total_count}条`;
            },
            showQuickJumper: true,
        };
    },
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || ' km';
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || ' m';
            return mileage + text;
        }
    },
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2');
    },
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2');
    },
    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = [];
        data.map(item => {
            options.push(
                <Option value={item.id} key={item.id}>
                    {item.name}
                </Option>
            );
        });
        return options;
    },
};
