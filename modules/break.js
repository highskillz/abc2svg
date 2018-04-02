// break.js - module to handle the %%break command
//
// Copyright (C) 2018 Jean-Francois Moine - GPL3+
//
// This module is loaded when "%%break" appears in a ABC source.
//
// Parameters
//	%%break measure_nb [":" num "/" den] [" " measure ...]*

function Break(i_abc) {
    var	abc = i_abc

// constants from the abc2svg core
    var	BAR = 0,
	BASE_LEN = 1536

	// %%break measure_nb [":" num "/" den] [" " measure ...]*
	Break.prototype.get_break = function(parm) {
	    var	b, c, d, sq,
		a = parm.split(/[ ,]/);

		abc.glovar.break = []
		for (n = 1; n < a.length; n++) {
			b = a[n];
			c = b.match(/(\d)([a-z]?)(:\d\/\d)?/)
			if (!c) {
				abc.syntax(1, err_bad_val_s, "%%break")
				continue
			}
			if (c[2])
				sq = c[2].charCodeAt(0) - 0x61
			if (!c[3]) {
				abc.glovar.break.push({	// on measure bar
						m: c[1],
						t: 0,
						sq: sq})
				continue
			}
			d = c[3].match(/:(\d)\/(\d)/)
			if (!d || d[2] < 1) {
				abc.syntax(1, "Bad denominator in %%break")
				continue
			}
			abc.glovar.break.push({
					m: c[1],
					t: d[1] * BASE_LEN / d[2],
					sq: sq})
		}
	} // get_break()

	// insert the EOLs of %%break
	Break.prototype.do_break = function() {
	    var	i, m, t, brk, seq,
		v = abc.get_cur_sy().top_voice,
		s1 = abc.voice_tb[v].sym

		for (i = 0; i < abc.glovar.break.length; i++) {
			brk = abc.glovar.break[i];
			m = brk.m
			for (s = s1; s; s = s.next) {
				if (s.type == BAR && s.bar_num == m)
					break
			}
			if (!s)
				continue

			if (brk.sq) {
				seq = brk.sq
				for (s = s.ts_next; s; s = s.ts_next) {
					if (s.type == BAR
					 && s.bar_num == m) {
						if (--seq == 0)
							break
					}
				}
				if (!s)
					continue
			}

			t = brk.t
			if (t) {
				t = s.time + t
				for ( ; s; s = s.next) {
					if (s.time >= t)
						break
				}
				if (!s)
					continue
				s = s.prev
			}
			s.eoln = true
		}
	} // do_break()

// Break creation

	//export some functions/variables
	abc.tosvg('break', '\
%%beginjs\n\
Abc.prototype.get_cur_sy = function() { return cur_sy }\n\
Abc.prototype.glovar = glovar\n\
Abc.prototype.syntax = syntax\n\
Abc.prototype.voice_tb = voice_tb\n\
\
var brk = {\n\
	psc: do_pscom,\n\
	sbn: set_bar_num\n\
}\n\
do_pscom = function(text) {\n\
	if (text.slice(0, 6) == "break ")\n\
		Break.prototype.get_break(text)\n\
	else\n\
		brk.psc(text)\n\
}\n\
set_bar_num = function() {\n\
	brk.sbn();\n\
	Break.prototype.do_break()\n\
}\n\
%%endjs\n\
')

} // Break()
