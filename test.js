var test = require('tape');
var procpid = require('./')();

test('reads from proc for current process', function (t) {
	t.plan(2);

	procpid.pid(process.pid, function (err, data) {
		console.log(data);
		t.ok(data.io.rchar)
		t.ok(data.status.Name);
		t.end();
	});
});
