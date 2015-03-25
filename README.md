proc-pid
--------

Read select \"files\" from /proc/:pid/

install
-------

```bash
npm install proc-pid
```

example
-------

```js
var procpid = require('proc-pid')();

procpid.pid(process.pid, function (err, data) {
	console.log(data);
});
```

api
---

### Constructor

var procpid = require('proc-pid')({
	stats : ['io', 'status']
});

### .pid(pid, cb);

* `pid` is the process id of the process to look up in /proc
* `cb` is the callback
	* signature function (err, data)

The data object will contain an attribute for each of the
stats requested in the constructor (which by default is io and status).

For example:

```json
{ io: 
   { rchar: '61960',
     wchar: '79',
     syscr: '44',
     syscw: '7',
     read_bytes: '0',
     write_bytes: '4096',
     cancelled_write_bytes: '0' },
  status: 
   { Name: 'node',
     State: 'R (running)',
     Tgid: '28806',
     Ngid: '0',
     Pid: '28806',
     PPid: '25596',
     TracerPid: '0',
     Uid: '1000\t1000\t1000\t1000',
     Gid: '1000\t1000\t1000\t1000',
     FDSize: '256',
     Groups: '7 20 103 111 122 129 1000 1001 5000',
     VmPeak: '719284 kB',
     VmSize: '691732 kB',
     VmLck: '0 kB',
     VmPin: '0 kB',
     VmHWM: '11124 kB',
     VmRSS: '11124 kB',
     VmData: '664476 kB',
     VmStk: '140 kB',
     VmExe: '8496 kB',
     VmLib: '4176 kB',
     VmPTE: '164 kB',
     VmSwap: '0 kB',
     Threads: '6',
     SigQ: '0/46993',
     SigPnd: '0000000000000000',
     ShdPnd: '0000000000000000',
     SigBlk: '0000000000000000',
     SigIgn: '0000000000001000',
     SigCgt: '0000000180004202',
     CapInh: '0000000000000000',
     CapPrm: '0000000000000000',
     CapEff: '0000000000000000',
     CapBnd: '0000001fffffffff',
     Seccomp: '0',
     Cpus_allowed: '0f',
     Cpus_allowed_list: '0-3',
     Mems_allowed: '00000000,00000001',
     Mems_allowed_list: '0',
     voluntary_ctxt_switches: '7',
     nonvoluntary_ctxt_switches: '24' } }
```

license
-------

MIT
