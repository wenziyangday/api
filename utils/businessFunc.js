//  业务方法

const businessFunc = {

	//  过滤参数中的''
	filterSpace: (conf) => {
		let keys = Object.keys(conf), values = Object.values(conf);
		values.map((x, index) => {
			if (x === '') {
				delete conf[keys[index]];
			}
		});

		return conf;
	},

	//  分页相关
	page: (obj) => {
		//  限定查询 隐藏、正常、置顶
		let inState = {state: {$in: [0, 1, 2]}};

		//  根据状态查询 当有状态变量时 直接用该变量 查询
		let params = {...inState, ...obj};
		let newParams = params;

		//  分页信息
		let limit = 0, skip = 0;
		if (params.isPaging) {
			limit = params.pageSize ? params.pageSize : 10;
			skip = (params.pageNum - 1) * limit;

			delete newParams.isPaging;
			delete newParams.pageNum;
			delete newParams.pageSize;
		}

		return {newParams, skip, limit};
	}
};
module.exports = businessFunc;
