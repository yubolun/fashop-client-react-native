import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { List } from "antd-mobile-rn";
// import { updateUserInfo } from '../../actions/user';
import { PublicStyles, windowWidth } from '../../utils/style';
import Avatar from "../../components/public/avatar";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import Badge from "@react-native-component/react-native-smart-badge";

const Item = List.Item

@connect(
({
    app: {
        user: {
            login,
            userInfo,
            orderNum,
        }
    }
}) => (
    {
        login,
        userInfo,
        orderNum,
    }
))
export default class User extends Component {
    // componentDidCatch(){
    //     const { login, dispatch } = this.props
    //     if(login){
    //         dispatch(updateUserInfo())
    //     }
    // }
    goOrderList() {
        this.props.navigation.navigate('OrderList')
    }
    render() {
        return <View style={PublicStyles.ViewMax}>
            {
                this.top()
            }
            {
                this.mid()
            }
            {
                this.bot()
            }
        </View>;
    }
    top() {
        const { login, userInfo, navigation } = this.props;
        return (
            <TouchableOpacity
                style={[PublicStyles.rowBetweenCenter, styles.topWarp]}
                activeOpacity={.8}
                onPress={() => {
                    navigation.navigate(login ? "UserInfo" : "UserLogin")
                }}
            >
                <View style={PublicStyles.rowCenter}>
                    <Avatar
                        avatar={login&&userInfo&&userInfo.profile ? userInfo.profile.avatar : null}
                        size={60}
                        otherStyle={{
                            marginRight: 15,
                        }}
                    />
                    <Text style={[PublicStyles.boldTitle, { fontSize: 20 }]}>
                        {
                            login&&userInfo&&userInfo.profile ? userInfo.profile.nickname : "点击登录"
                        }
                    </Text>
                </View>
                <View style={PublicStyles.rowCenter}>
                    <Text style={PublicStyles.descFour9}>设置</Text>
                    <EntypoIcon
                        name="chevron-small-right"
                        size={24}
                        color="#CCCCCC"
                    />
                </View>
            </TouchableOpacity>
        )
    }

    mid() {
        const { orderNum, navigation } = this.props;
        const orderList = [
            {
                img: require('../../images/user/state_new.png'),
                title: '待付款',
                num: orderNum.state_new,
                path: "OrderList",
                params: {
                    state_type:'state_new'
                }
            }, {
                img: require('../../images/user/state_pay.png'),
                title: '待发货',
                num: orderNum.state_send,
                path: "OrderList",
                params: {
                    state_type:'state_pay'
                }
            }, {
                img: require('../../images/user/state_send.png'),
                title: '已完成',
                num: orderNum.state_success,
                path: "OrderList",
                params: {
                    state_type:'state_success'
                }
            }, {
                img: require('../../images/user/state_unevaluate.png'),
                title: '待评价',
                num: orderNum.state_unevaluate,
                path: "EvaluateList"
            }, {
                img: require('../../images/user/state_refund.png'),
                title: '退款售后',
                num: orderNum.state_refund,
                path: "RefundList"
            }
        ]
        return (
            <View style={{ marginVertical: 10 }}>
                <List>
                    <Item
                        extra={(<Text style={PublicStyles.descFour9}>全部订单</Text>)}
                        arrow="horizontal"
                        onClick={() => {
                            this.goOrderList()
                        }}
                    >
                        <Text style={PublicStyles.boldTitle}>我的订单</Text>
                    </Item>
                </List>
                <View style={styles.midList}>
                    {
                        orderList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.midItem}
                                onPress={() => {
                                    navigation.navigate(item.path, item.params)
                                }}
                            >
                                {
                                    item.num ?
                                    <Badge
                                        textStyle={{ color: '#fff', fontSize: 10, paddingHorizontal: 2 }}
                                        style={{ position: 'absolute', right: 10, top: -10 }}
                                    >
                                        {
                                            item.num
                                        }
                                    </Badge> : null
                                }
                                <Image style={styles.midImg} source={item.img} />
                                <Text style={PublicStyles.descTwo6}>{item.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    bot() {
        const botList = [
            {
                img: require('../../images/user/address.png'),
                title: '地址管理',
                path: () => {
                    this.props.navigation.navigate('UserAddressList')
                }
            }, {
                img: require('../../images/user/collect.png'),
                title: '商品收藏',
                path: () => {
                    this.props.navigation.navigate('CollectGoods')
                }
            }
        ]
        return (
            <View style={PublicStyles.ViewMax}>
                <List style={PublicStyles.ViewMax}>
                    {
                        botList.map((item, index) => (
                            <Item
                                key={index}
                                arrow="horizontal"
                                onClick={() => {
                                    item.path()
                                }}
                            >
                                <View style={PublicStyles.rowCenter}>
                                    <Image style={styles.botImg} source={item.img} />
                                    <Text style={PublicStyles.title}>{item.title}</Text>
                                </View>
                            </Item>
                        ))
                    }
                </List>
                <View style={styles.fashopCopyright}>
                    <View style={styles.fashopCopyrightBody}>
                        <Image source={require('../../images/fashop/copyright.png')} mode="aspectFit"
                               style={styles.fashopCopyrightImg} />
                        <Text style={styles.fashopCopyrightText}>提供技术支持</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topWarp: {
        height: 100,
        paddingHorizontal: 15,
        backgroundColor: '#fff'
    },
    midList: {
        flexDirection: 'row',
        alignItems: "center",
        height: 75,
        backgroundColor: '#fff'
    },
    midItem: {
        flex: 1,
        alignItems: "center"
    },
    midImg: {
        width: 22,
        height: 22,
        marginBottom: 9
    },
    botImg: {
        width: 22,
        height: 22,
        marginRight: 10
    },
    fashopCopyright: {
        bottom: 0,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fashopCopyrightBody: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    fashopCopyrightImg: {
        height: 16,
        width: 50,
        marginRight: 5
    },
    fashopCopyrightText: {
        color: '#cccccc',
        fontSize: 12,
        lineHeight: 12,
    }
});
