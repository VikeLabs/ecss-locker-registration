import sqlite3 from 'better-sqlite3';

function range(start, end) {
	return [...Array(1 + end - start).keys()].map((n) => start + n);
}

const lockers = [range(1, 200)].flat().map((x) => x.toString());
// console.log(lockers)

const db = sqlite3('db.sqlite3', { fileMustExist: true });
db.transaction(() => {
	const makeLocker = db.prepare('INSERT OR IGNORE INTO locker VALUES(?)');
	lockers.forEach((n) => makeLocker.run(n));
})();
db.close();
