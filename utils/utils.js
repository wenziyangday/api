const moment = require('moment');

const utils = {

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

	//  简单深拷贝
	simpleDeepCopy: (obj) => {
		return JSON.parse(JSON.stringify(obj));
	},

	//	处于时间区间内
	inDate: (begin, end, chosen) => {
		let beginTimes = new Date(begin);
		let endTimes = new Date(end);
		let chosenTimes = new Date(chosen);

		let beginSeconds = beginTimes.getTime();
		let endSeconds = endTimes.getTime();
		let chosenSeconds = chosenTimes.getTime();

		let back = false;

		if (chosenSeconds > beginSeconds && chosenSeconds < endSeconds) {
			back = true;
		}

		return back;
	},

	//  时间相似
	likeDate: (chosen, reference) => {
		let chosenOne = moment(chosen).format('YYYY-MM-DD').toString();
		let referenceOne = moment(reference).format('YYYY-MM-DD').toString();
		let back = false;
		if (chosenOne === referenceOne) {
			back = true;
		}
		return back;
	},

	//	过滤掉指定的字段
	filterKey: (obj, key) => {
		let newObj = {};
		let arr = Object.keys(obj);
		arr.map(x => {
			if (Array.isArray(key)) {
				if (!key.includes(x)) {
					newObj[x] = obj[x];
				}
			} else {
				if (key !== x) {
					newObj[x] = obj[x];
				}
			}

		});
		return newObj;
	}


};

module.exports = utils;
