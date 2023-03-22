<template>
	<view class="kingTable" :style="{ height: tableHeight }">
		<view class="kingFlex" v-if="tableData.length != 0">
			<!-- 左侧固定的主体部分 -->
			<view class="kingSticky kingLeftCon">
				<view class=" kingSticky" style="top: 0">
					<view class="kingFlex">
						<view class="tableHead" v-for="(item, index) in tableHeadL" :key="index">
							<view class="tableColmn" :style="{backgroundColor:tableHeadStyle.backgroundColor,fontSize:tableHeadStyle.fontSize,fontWeight:tableHeadStyle.fontWeight}">{{ item }}</view>
						</view>
					</view>
					<view class="kingFlex">
						<view class="tableHead" v-for="(item, index) in tableHeadL" :key="index">
							<view class="tableColmn" :style="{backgroundColor:tableHeadStyle.backgroundColor,fontSize:tableHeadStyle.fontSize,fontWeight:tableHeadStyle.fontWeight}">{{ item }}</view>
						</view>
					</view>
				</view>
				<view class="kingFlex first">
					<!-- 遍历左侧的的表头 -->
					<block v-for="(item1, index1) in tableHeadLKey" :key="index1">
						<view class="">
							<block v-for="(item, index) in tableData" :key="index">
								<view  @click="getIndex(item[item1], index)" :style="{ backgroundColor: isIndex == index ? tableClickCol : '' }" class="tableColmn">{{ item[item1] }}</view>
							</block>
						</view>
					</block>
				</view>
			</view>
			<!-- 右侧可左右滑动部分，结构跟左侧一模一样的，只是这样分开来弄可以解决左右滑动的问题，实现想不出其他方法了，求大佬改进 -->
			<view class="">
				<view class=" kingSticky" style="top: 0">
					<view class="kingFlex">
						<view class="tableHead" v-for="(item, index) in tableHeadR" :key="index">
							<view class="tableColmn" :style="{backgroundColor:tableHeadStyle.backgroundColor,fontSize:tableHeadStyle.fontSize,fontWeight:tableHeadStyle.fontWeight}">{{ item }}</view>
						</view>
					</view>
					<view class="kingFlex">
						<view class="tableHead" v-for="(item, index) in tableHeadR" :key="index">
							<view class="tableColmn" :style="{backgroundColor:tableHeadStyle.backgroundColor,fontSize:tableHeadStyle.fontSize,fontWeight:tableHeadStyle.fontWeight}">{{ item }}</view>
						</view>
					</view>
				</view>
				<view class="kingFlex">
					<block v-for="(item1, index1) in tableHeadRKey" :key="index1">
						<view class="">
							<block v-for="(item, index) in tableData" :key="index">
								<view  @click="getIndex(item[item1], index)" :style="{ backgroundColor: isIndex == index ? tableClickCol : '' }" class="tableColmn">{{ item[item1] }}</view>
							</block>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * @Date: 2021-05-10
 * @author @拿菜刀砍电线
 * @Description:1、整体构思，左右两部分，可以左右滑动2、左右两部分里面又分上下两部分
 */
export default {
	data() {
		return {
			// 表格高度，一定要给，横屏模式下需要给定高度才能固定表头上下滑动
			tableHeight: null,
			// 是否点击的那一行，为了点击变背景色
			isIndex: null
		};
	},
	props: {
		// 主表数据（后端返回来）
		tableData: {
			type: [Array, Boolean],
			default() {
				return [];
			}
		},
		// 左侧表头
		tableHeadL: {
			type: [Array],
			default() {
				return [];
			}
		},
		// 右侧表头
		tableHeadR: {
			type: [Array],
			default() {
				return [];
			}
		},
		// 自定义左侧表头对应的字段（长度一定要跟表头的长度想对应）
		tableHeadLKey: {
			type: [Array],
			default() {
				return [];
			}
		},
		// 自定义右侧表头对应的字段（长度一定要跟表头的长度想对应）
		tableHeadRKey: {
			type: [Array],
			default() {
				return [];
			}
		},
		// 表头的样式
		tableHeadStyle: {
			type: Object,
			 default: function () {
			        return {
					backgroundColor: 'gold',
					fontSize: '16px',
					fontWeight: 'bold'
				}
			      }
		},
		// 点击每一行显示的颜色
		tableClickCol: {
			type: String,
			default: 'green'
		}
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				console.log(res);
				// 给定表格的高度
				this.tableHeight = res.screenHeight - 60 + 'px';
			}
		});
	},
	methods: {
		// 点击的时候，转换下标
		getIndex(cell, idx) {
			this.$emit('getCellVal',cell);
			this.isIndex = idx;
		}
	}
};
</script>

<style lang="scss" scoped>
.kingTable {
	// 解决刘海屏的问题
	margin-left: var(--status-bar-height);
	// 一定要有，左右滑动的依据
	overflow-x: auto;
	// 改变边框的样式要修改此处
	border-left: 1px solid #000;
	.kingLeftCon {
		// z-index为了解决左右滑动能显示在上层
		z-index: 9;
		left: 0;
		background-color: #ffffff;
	}
}
.kingFlex {
	display: flex;
}
.kingSticky {
	position: sticky;
	position: -webkit-sticky;
}
.tableStyle {
}
.tableHead {
	// 改变边框的样式要修改此处
	border-top: 1px solid #000;
}

.tableColmn {
	// 改变边框的样式要修改此处
	border-right: 1px solid #000;
	border-bottom: 1px solid #000;
	width: 50px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-size: 10px;
	color: #333333;
}
</style>
