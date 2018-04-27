import { connect } from 'dva';
import React, { PureComponent } from 'react';
import {message} from "antd/lib/index";
// import { TimelineChart } from 'ant-design-pro/lib/Charts'; 这个写法应发 state 状态重置的 bug
import { TimelineChart } from '../../components/Charts';

@connect(({ loading, gcr }) => ({
    queryListData: gcr.queryListData,
    loading: loading.models.gcr,
}))

export default class OfflineVideo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        };
    }
    componentWillMount() {
        this.getDataList()
    }

    getDataList() {
        const { dispatch } = this.props;
        dispatch({
            type: 'gcr/fetch',
            payload: {
                st: '1524816319',
                et:'1524816489',
            },
            callback: () => {
            const { queryListData } = this.props;
        console.log(this.props);
        console.log(queryListData);
        if(queryListData.code===0){
            const chartData = [];
            for (let i = 0; i < 20; i += 1) {
                chartData.push({
                    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
                    y1: Math.floor(Math.random() * 100) + 1000,
                    y2: Math.floor(Math.random() * 100) + 10,
                });
            }
            this.setState({
                listData: chartData
            });
        }else{
            message.error(queryListData.msg);
        }
    },
    });
    }

    render() {
        const state = this.state;
        let flowData = state.listData || [];
        return (
            <div className="gcr-offline-video">
            <TimelineChart
        height={200}
        // data={this.state.data} 这里写这个会导致 callback 传参识别
        // data={flowData}
        titleMap={{ y1: '客流量', y2: '支付笔数' }}
        />
        </div>
    );
    }
}

