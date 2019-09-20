import IEntityType from './IEntityType';

function objectParse<T>(obj: any, type: IEntityType<T>): T {
	let res = null;

	if (obj == null) {
	} else if (Array.isArray(obj)) {
		res = [];
		obj.forEach((val, i) => {
			res[i] = val;
		});
	} else if (typeof obj == 'object') {
		res = new type();
		let keys = Reflect.ownKeys(res);
		keys.forEach(key => {
			let val = obj[key];
			if (isPrimitive(res[key]) && isPrimitive(val) && (res[key] == null || typeof res[key] == typeof val)) {
				res[key] = val;
			} else {
				let propType: IEntityType<any> = res[key].constructor;
				res[key] = objectParse(val, propType);
			}
		});
	} else {
		res = new type(obj);
	}

	return res;
}

function isPrimitive(test) {
	return (test !== Object(test));
}

export default objectParse;
