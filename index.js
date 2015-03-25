var readFile = require('fs').readFile
	, join = require('path').join
	, autocast = require('autocast')
	;

module.exports = function (options) {
	return new ProcPidReader(options);
};

module.exports.options = {
	stats : ['io', 'status']
}

module.exports.ProcPidReader = ProcPidReader

function ProcPidReader (options) {
	var self = this;

	self.options = options || module.exports.options;
	self.options.stats = self.options.stats || module.exports.options.stats;
}

ProcPidReader.prototype.pid = function (pid, cb) {
	var self = this;
	var pending = 0;
	var result = {};

	pid = parseInt(pid, 10);

	if (isNaN(pid)) {
		return cb(new Error("pid is not a number"));
	}

	self.options.stats.forEach(function (stat) {
		pending += 1;

		readFile(join('/proc', pid.toString(), stat), 'utf8', function (err, data) {
			pending -= 1;

			result[stat] = self.parse(data);
			
			maybeFinish(err);
		});
	});

	function maybeFinish(err) {
		if (pending === 0) {
			return cb(err, result);
		}
	}
};

ProcPidReader.prototype.parse = function (data) {
	var self = this;
	var result = {};

	data.split('\n').forEach(function (line) {
		var toks = line.split(/:/);
		if (toks.length === 2) {		
			result[toks[0].trim()] = autocast(toks[1].trim());
		}
		else {
			//TODO: do something about this	
		}
	});

	return result;
};
