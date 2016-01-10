var readFile = require('fs').readFile
	, readLink = require('fs').readlink
	, join = require('path').join
	, autocast = require('autocast')
	;

module.exports = function (options) {
	return new ProcPidReader(options);
};

module.exports.options = {
	stats : ['io', 'status', 'cmdline'],
	// target is a symbolic link's string value
	rl: ['cwd', 'exe', 'root'],
	// some proc file organize by colons
	parseColonFile: ['io', 'status']
}

module.exports.ProcPidReader = ProcPidReader

function ProcPidReader (options) {
	var self = this;

	// self.options = options || module.exports.options;
	self.options = module.exports.options;
	if(options.stats) self.options.stats = options.stats;
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

		if(self.options.rl.indexOf(stat) >= 0) {
			readLink(join('/proc', pid.toString(), stat), handleContent);
		} else {
			readFile(join('/proc', pid.toString(), stat), 'utf8', handleContent);
		}

		function handleContent(err, data) {
			pending -= 1;
			if(self.options.parseColonFile.indexOf(stat) >= 0) {
				result[stat] = self.parse(data);
			} else {
				result[stat] = data.replace(/\u0000/ig, ' ');
			}
			
			maybeFinish(err);
		}
	});

	function maybeFinish(err) {
		if (pending === 0) {
			return cb(err, result);
		}
	}
};

ProcPidReader.prototype.parse = function (data) {
	if('string' !== typeof data) return data;
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
