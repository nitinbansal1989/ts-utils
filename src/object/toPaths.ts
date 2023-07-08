function toPaths(obj: any, target?: { key: string, value: any }[], prefix?: string) {
	target = target || [];
	prefix = prefix || '';

	target = getPaths(obj, target, prefix);
	return target;
}

function getPaths(obj: any, target: { key: string, value: any }[], prefix: string) {
	if (obj && typeof obj === 'object') {
		if (Array.isArray(obj)) {
			obj.forEach((val, idx) => {
				target = getPaths(val, target, `${prefix}[${idx}]`);
			});
		} else {
			Object.entries(obj).forEach(([objKey, value]) => {
				let key = prefix ? `${prefix}.${objKey}` : objKey;
				target = getPaths(value, target, key);
			});
		}
	} else {
		target.push({ key: prefix, value: obj });
	}
	return target;
}

export default toPaths;
