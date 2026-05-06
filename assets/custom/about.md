
## Table of Contents
[//]: # (FIXME: This table does not link because this is not strictly github markdown. Need to resolve this someday)

- [EXCALIBUR](#excalibur)
    - [Organization](#organization)
        - [Data](#data)
        - [Tasks](#tasks-algorithms)
    - [Source Code](#source-code)
- [Becoming a Developer](#becoming-a-developer)
- [Run ID map to code changes](#run-id-from-code-change)


## --< EXCALIBUR >--

Exoplanet Calibration Bayesian Unified Retrieval Pipeline.

EXCALIBUR reduces extrasolar system data into an exoplanet spectrum.
It includes CERBERUS, a line by line, plane parallel radiative transfer code modeling exoplanet atmospheres and a Bayesian parameter retrievial / model selection package. 

EXCALIBUR is an event driven pipeline where the events are defined as changes in data or algorithms; when events are detected, dependencies affected by the changes are re-processed. Calibration steps are transparent and quantified using a combination of accessible intermediate products and auto-generation of visual diagnostics.

### --< Organization >--

#### --< Data >--

Some of the items we do not maintain (external) are static. Static executables and libraries are kept out of the code management.

- /proj/sdp/bin (external executables such as pymc, ...)
- /proj/sdp/lib (external libraries)
- /proj/sdp/pkg (external source code and build area)
- /proj/sdp/data/cal (instrument reference calibration files such as STSCI files, ...)
- /proj/sdp/data/res (resource files such as web interface tools, ...)
- /proj/sdp/data/sci (on-disk data to be processed such as private datasets, ...)

#### --< TASKS / algorithms >--

TARGET
- create (IDs and filters)
- autofill (prior system information from NEXSCI)
- scrape (download and save available data)

SYSTEM
- validate (checks for system parameters completeness)
- finalize (delivers a comprehensive set of system parameters uniformly formatted, allows parameters over-ride)

DATA
- collect (sort data according to filters)
- calibration (extraction, wavelength solution, noise assessment)
- timing (transit, eclipse, full phase curve detection)

TRANSIT
- normalization (scaling of stellar spectrum to Out Of Transit relative quantities)
- whitelight (orbital solution and instrumental behavior recovery)
- spectrum (exoplanet transmission spectrum recovery)

ECLIPSE
- normalization (scaling of stellar spectrum to Out Of Transit relative quantities)
- whitelight (orbital solution and instrumental behavior recovery)
- spectrum (exoplanet emission spectrum recovery)

PHASECURVE
- normalization (scaling of stellar spectrum to Out Of Transit relative quantities)
- whitelight (orbital solution and instrumental behavior recovery)

CERBERUS
- xslib (cross section library from EXOMOL and HITEMP/HITRAN)
- atmos (model selection and atmospheric content recovery)

### --< Source Code >--

## --< Becoming a Developer >--

Contact mentor sysadmins ("Luong, Danny (US 398C)" <danny.luong@jpl.nasa.gov>) and ask for:

1. An account on mentor[1-2]
1. Create PGP keys for interacting with EXCALIBUR
1. Add you to the docker group
1. Add you to the notebook users/group

Find helpful tools at "/home/groudier/SCRIPTS"

1. dotprofile.txt alias dckrdb
1. dotprofile.txt alias dckrsrvr
1. dckshelf.sh

Once all of that is accomplished, request access to github-fn.jpl.nasa.gov/orgs/EXCALIBUR/people from github.support@jpl.nasa.gov. After you have access and have logged into github-fn.jpl.nasa.gov, request the EXCALIBUR foreman team to add you to the appropriate team(s).


## --< Run ID from code change >--

[//]: # (DO NOT REMOVE: start list)
[//]: # (DO NOT REMOVE: start rid {1094, '1094', 'a3a3d771e51b846ebc5d4afb389d39dc0e212e52'})

### Run ID 1094

__Changeset__: [a3a3d771e51b846ebc5d4afb389d39dc0e212e52](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/a3a3d771e51b846ebc5d4afb389d39dc0e212e52)

__Date__:  Tue Dec 10 05:20:00 2024 -0800

__Title__:  696 follow up on jwst after 2024 internships ([#711](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/711))

* data cal jwst

* Fix mastpoke for JWST target scrape

* CIs

---------

Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {1091, '1091', 'b2aeceb6d3e984b8ecd09373ce88375938f575c5'})

### Run ID 1091

__Changeset__: [b2aeceb6d3e984b8ecd09373ce88375938f575c5](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/b2aeceb6d3e984b8ecd09373ce88375938f575c5)

__Date__:  Tue Nov 19 18:22:47 2024 -0800

__Title__:  Ariel-sim analysis with Tier-1 SNR  ([#704](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/704))

* add ariel tier-1 target list
* remove duplicate HD 110067
* read in Tier-1 #-of-visits
* dont read Edwards tables; use #-of-visits from ArielRad
* drop old observingplan method; select tier for SNR
* switch analysis from Tier2 to Tier1
* pass in tier-level via runtime in arial/algorithms

* extend usage of Gaels mastpoke loop (for the 6 autofills that just failed)

* limit cerb.analysis to specific planet letters, not all planets for each star

* save myfit.results as phasecurve state vector, for plotting posteriors
---------
Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {1072, '1072', '342593833c7490edc6a2e170584c34d39db93b92'})

### Run ID 1072

__Changeset__: [342593833c7490edc6a2e170584c34d39db93b92](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/342593833c7490edc6a2e170584c34d39db93b92)

__Date__:  Thu Nov 7 13:23:17 2024 -0800

__Title__:  new targets from Burt and ExoFOP ([#697](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/697))

* add in Burt targets; update exoplanet archive aliases
* add new target lists to the active list
* add new JWST targets to targetlist
* add GJ 3090 to jwst list
* update the ariel 2-year targetlist (259 targets)
* remove duplicate TOI-1136

* unselect ppt-format plotting option

* remove old ariel instrument model read

* add G395M filter to runtime
* try to fix runtime binding checksum test error

* loops over multiple ArielRad files (target list is too long now)

* use new ariel list for mass-metal plot
---------
Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {1072, '1072', '5ec78385af1aec6564eca891e47240cda3a831e5'})

### Run ID 1072

__Changeset__: [5ec78385af1aec6564eca891e47240cda3a831e5](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/5ec78385af1aec6564eca891e47240cda3a831e5)

__Date__:  Thu Nov 7 15:09:23 2024 -0800

__Title__:  fix up about page ([#700](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/700))

* some cleanup

* fix two problems
1. sort correctly by making the rid an integer
2. quit adding unnecessary whitespace

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {1072, '1072:1090', '19001234456a0fa8afba4344e74ca2f5de24a4d4'})

### Run ID 1072:1090

__Changeset__: [19001234456a0fa8afba4344e74ca2f5de24a4d4](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/19001234456a0fa8afba4344e74ca2f5de24a4d4)

__Date__:  Fri Nov 8 13:30:44 2024 -0800

__Title__:  Reset tool ([#701](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/701))

* new tool for reset

Allow users to reset their private pipeline and the operational pipeline. Read the help for how to specify the operational pipeline. The default is to reset ones own pipeline.

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {1067, '1067', '2c0ad3f9d352ac97d071d5f55c1fbca97af92685'})

### Run ID 1067

__Changeset__: [2c0ad3f9d352ac97d071d5f55c1fbca97af92685](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/2c0ad3f9d352ac97d071d5f55c1fbca97af92685)

__Date__:  Mon Nov 4 09:59:51 2024 -0800

__Title__:  Target Autofill 2.0.2 ([#699](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/699))

* Target Autofill 2.0.2
* fix to waitabit. Return instead of pass for the function failing nmax times.
---------
Co-authored-by: Gael, Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {1046, '1046', '3f7a950ca2388db20a42ea65397e0d15dedcb776'})

### Run ID 1046

__Changeset__: [3f7a950ca2388db20a42ea65397e0d15dedcb776](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/3f7a950ca2388db20a42ea65397e0d15dedcb776)

__Date__:  Thu Oct 10 09:06:00 2024 -0700

__Title__:  691_starspots ([#692](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/692))

* add in new transit.starspots
* update ariel 2-year target list
* drop refs-by-hand for 4 raissa targets
* plot cleaning for Oct.2024 ppt slides
---------
Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {955, '955', 'd8e9983db2c89d4ab9e6692c5ca832568c1b5ca1'})

### Run ID 955

__Changeset__: [d8e9983db2c89d4ab9e6692c5ca832568c1b5ca1](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/d8e9983db2c89d4ab9e6692c5ca832568c1b5ca1)

__Date__:  Wed Jun 26 10:52:12 2024 -0700

__Title__:  Update states.py ([#655](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/655))

Need to use the correct key

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {955, '955', '85ace8b01c0b62d46329ec685df8989647f02323'})

### Run ID 955

__Changeset__: [85ace8b01c0b62d46329ec685df8989647f02323](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/85ace8b01c0b62d46329ec685df8989647f02323)

__Date__:  Tue Jun 25 15:44:30 2024 -0700

__Title__:  695 system param update - multiplanet criterion ([#654](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/654))

* removing default-metallicity overwrites; not needed with new default-metallicity filling routine
* remove one more FEH overwrite
* new multi-planet sum for the self-consistency metric
* more overwriter cleanup (L 98-59)
* remove debugging print
* fix strange bug with aspect keys
* fix the y-axis range for C/O plot
* check for failed MAST fits files
* specify exception error

---------

Co-authored-by: bryden <bryden@jpl.nasa.gov>
Co-authored-by: Gael M Roudier <Gael.M.Roudier@jpl.nasa.gov>
Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {955, '955', '1ce4febbf5028845fe9bb014354ecee03bc65390'})

### Run ID 955

__Changeset__: [1ce4febbf5028845fe9bb014354ecee03bc65390](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/1ce4febbf5028845fe9bb014354ecee03bc65390)

__Date__:  Tue Jun 25 10:48:41 2024 -0700

__Title__:  628: use runtime state vectors ([#637](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/637))

* fix name dischord
* add helper function
* add hook for just valid too
* wip
* wip
* fixed all the pylint errors
* regen data binding
* fix pylint errors from merge
---------
Co-authored-by: Al Niessner <Al.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {925, '925:926', '780a513ad7e5cac2cd154c9ecb99125ed0a05ba0'})

### Run ID 925:926

__Changeset__: [780a513ad7e5cac2cd154c9ecb99125ed0a05ba0](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/780a513ad7e5cac2cd154c9ecb99125ed0a05ba0)

__Date__:  Tue May 14 16:03:54 2024 -0700

__Title__:  Update algorithms.py ([#630](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/630))

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {925, '925', 'af1044205f6a4d3096149006224f144ca67d6055'})

### Run ID 925

__Changeset__: [af1044205f6a4d3096149006224f144ca67d6055](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/af1044205f6a4d3096149006224f144ca67d6055)

__Date__:  Thu May 9 15:14:43 2024 -0700

__Title__:  610: move runtime control from the shadows to state vectors ([#619](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/619))

* added runtime

The configuration for runtime behavior is in excalibur.runtime. Only the aspect is meant to be run. It translates an XML file to state vector information.

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {886, '886', '775a5ecc8cde9c726bb69ef7a0f0c8dad2952cd9'})

### Run ID 886

__Changeset__: [775a5ecc8cde9c726bb69ef7a0f0c8dad2952cd9](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/775a5ecc8cde9c726bb69ef7a0f0c8dad2952cd9)

__Date__:  Thu Jan 4 18:31:12 2024 -0800

__Title__:  JWST - Timing view debug ([#597](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/597))

* timing view test

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {883, '883', '55a08d2c9a3caca889c8e7ca2d7e0e49c25704d7'})

### Run ID 883

__Changeset__: [55a08d2c9a3caca889c8e7ca2d7e0e49c25704d7](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/55a08d2c9a3caca889c8e7ca2d7e0e49c25704d7)

__Date__:  Mon Jan 1 14:51:49 2024 -0800

__Title__:  scrape status ([#594](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/594))

* scrape status

* CIs

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {855, '855', '7272daeb48e618580812f1312f0b043e170e4ead'})

### Run ID 855

__Changeset__: [7272daeb48e618580812f1312f0b043e170e4ead](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/7272daeb48e618580812f1312f0b043e170e4ead)

__Date__:  Tue Dec 12 10:35:10 2023 -0800

__Title__:  fewer workers per farm

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {853, '853:854', 'e71cc032ce46a76dd9fb33b16b17fd887e89cc25'})

### Run ID 853:854

__Changeset__: [e71cc032ce46a76dd9fb33b16b17fd887e89cc25](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/e71cc032ce46a76dd9fb33b16b17fd887e89cc25)

__Date__:  Mon Dec 4 14:35:38 2023 -0800

__Title__:  Turn on g141 cerberus, part 2 ([#576](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/576))

* cerberus fit G141 data

* fixed comment typo

* dont crash if ariel-sim is missing

* avoid cerberus crash when filter is missing

* only loop through available filters in cerb.results

* add ariel to exclude list

* clean up messages for blank filters

* use system.final Teq, not Ariel model-param Teq

* whitespace

* small error in error message

* wow jenkins actually found a bug!

* dont plot truth if there isnt any

* allow for DISEQ plots

* fix bug for when no truth value

* updated results to handle multiple models (TEQ,DISEQ)

* whitespace

* forgot to copy plotting.py

---------

Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {852, '852', '58335c0f04ee5201316c06a47078a52caa05d3f7'})

### Run ID 852

__Changeset__: [58335c0f04ee5201316c06a47078a52caa05d3f7](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/58335c0f04ee5201316c06a47078a52caa05d3f7)

__Date__:  Tue Nov 28 14:24:30 2023 -0800

__Title__:  cerberus fit G141 data ([#575](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/575))

* cerberus fit G141 data

* fixed comment typo

---------

Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {751, '751', 'ce8f700892ef7e7921d9b03b4472f7032310ebb5'})

### Run ID 751

__Changeset__: [ce8f700892ef7e7921d9b03b4472f7032310ebb5](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/ce8f700892ef7e7921d9b03b4472f7032310ebb5)

__Date__:  Wed Aug 30 13:49:57 2023 -0700

__Title__:  Re-Trigger  ([#548](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/548))

* Bugfixes to monitor, versioning

* CIs

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {749, '749:750', '0effb5fb65b21780eaeb14018e42db97545e1a79'})

### Run ID 749:750

__Changeset__: [0effb5fb65b21780eaeb14018e42db97545e1a79](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/0effb5fb65b21780eaeb14018e42db97545e1a79)

__Date__:  Tue Aug 29 16:04:09 2023 -0700

__Title__:  Rerun target autofill and scrape with new versions ([#547](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/547))

* Bug fixes - autofill and scrape at 2.0.1

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {746, '746:747', '53b937811c017f93f597618dc891ebefc60a0c0d'})

### Run ID 746:747

__Changeset__: [53b937811c017f93f597618dc891ebefc60a0c0d](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/53b937811c017f93f597618dc891ebefc60a0c0d)

__Date__:  Thu Aug 24 18:54:02 2023 -0700

__Title__:  Download JWST data ([#546](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/546))

* target autofill update

* Fix bugs

* CIs and bugs and mast api

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {742, '742', '89f774036d9c15d037b732dd9aa690c09446e82d'})

### Run ID 742

__Changeset__: [89f774036d9c15d037b732dd9aa690c09446e82d](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/89f774036d9c15d037b732dd9aa690c09446e82d)

__Date__:  Tue Aug 22 13:37:55 2023 -0700

__Title__:  Update Dockerfile.base ([#544](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/544))

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {694, '694:695', '51cf5fbdc81e0146e64c049cc49170ce5b265c05'})

### Run ID 694:695

__Changeset__: [51cf5fbdc81e0146e64c049cc49170ce5b265c05](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/51cf5fbdc81e0146e64c049cc49170ce5b265c05)

__Date__:  Tue Aug 15 07:40:27 2023 -0700

__Title__:  Update Dockerfile.base

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {686, '686', 'b88d5fd9e240efc73984b3f657180ce38103c3f0'})

### Run ID 686

__Changeset__: [b88d5fd9e240efc73984b3f657180ce38103c3f0](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/b88d5fd9e240efc73984b3f657180ce38103c3f0)

__Date__:  Mon Jul 31 16:15:36 2023 -0700

__Title__:  New 'analysis' task for cerberus ([#516](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/516))

* add agent for analysis

* new analysisSV class for viewing the analysis plots

* two new types of plots: retrival vs truth and mass-metallicity

* add new analysis class

* new analysis function; extracts retrieved/truth values and calls plotting routines

* run all targets but only 2000 MCMC steps; should finish overnight

* whitespace

* PEP8

* fix typo in comment

* move random seed earlier; save stellar metallicity

* separating the agent and actor runs

* fix filter exclusion logic

* separate actor/agent calls in transit

* whitespace

* moving random seed later a bit; has to be inside planet loop

* jenkins wont take Als loop filter

* try again on that jenkins loops trouble

* try again on that jenkins loops trouble

* whitespace

Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {660, '660', 'c091d9939bfb238f4db94db8e057c98a610cf55d'})

### Run ID 660

__Changeset__: [c091d9939bfb238f4db94db8e057c98a610cf55d](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/c091d9939bfb238f4db94db8e057c98a610cf55d)

__Date__:  Wed Jul 19 16:13:11 2023 -0700

__Title__:  new task - cerberus results ([#506](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/506))

* remove vestigal code giving error

* put saved true spectrum inside data key

* reorg saved params; plot unbinned spectrum; turn off clouds

* PEP8

* new resSV class; show the 4 new plots (saved in the state vector)

* TEC only; new clearfmcerberus forward model with no clouds; for simulations add true spectrum to out; new results() calculates best fit model and 100 random walker points and makes 4 plots

* rebin spectrum; 4 plotting routines

* add plot lines for truth

* new task results added to bot

* 5000 mcmc steps for Ariel only; no HST fitting

* dont fit names starting with K,T,W

* whitespace

* PEP8

* whitespace

* PEP8

* using Matthew Salinas uncertainty filling

* whitespace

* very low haze amplitude

* saving prior ranges and using them for plots/analysis

* whitespace

Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {642, '642:648', 'a0d6e76eac02f294548344a87f59d00225deef19'})

### Run ID 642:648

__Changeset__: [a0d6e76eac02f294548344a87f59d00225deef19](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/a0d6e76eac02f294548344a87f59d00225deef19)

__Date__:  Sun Jul 9 20:04:49 2023 -0700

__Title__:  simulate Ariel spectra ([#488](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/488))

* simulate Ariel spectra

* whitespace

* whitespace

* whitespace

* PEP8

* PEP8

* PEP8

* PEP8

* protected status

* set default RID for populations

* also save plot as sv

* plot from state vector, rather than from saved file

* whitespace

* include Ariel-sim filter

* add Ariel sim to cerberus

* fix bug: cerberus results STATUS not set to True

* stop double counting ariel filter

* PEP8

Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {640, '640', 'b6841c494386ff0075323e1a26dbcc3092d0c6ff'})

### Run ID 640

__Changeset__: [b6841c494386ff0075323e1a26dbcc3092d0c6ff](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/b6841c494386ff0075323e1a26dbcc3092d0c6ff)

__Date__:  Thu Jul 6 13:50:14 2023 -0700

__Title__:  479,481,482 histograms etc ([#487](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/487))

* swap agent/actor definitions

* add 62-star compilation for second histogram

* add 62-star compilation for second histogram

* two histos; new colors, bins, axes; strings filtered out

* savesv() added (saves .csv file)

* removed duplicate targets; updated a few autofills

* new file for keeping track of target lists

* add new agent for summary histograms

* relax sig-figs for consistency check

* fill blank inc; new savesv()

* fill blank inc from impact

* plot.py (for histo) is identical to the one in ancillary

* white space etc

* white space etc

* PEP8 LePew

* more

* more

* a few target edits

Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {625, '625', '5972b4c3a2116ceeffdcf21924d5503527ab3886'})

### Run ID 625

__Changeset__: [5972b4c3a2116ceeffdcf21924d5503527ab3886](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/5972b4c3a2116ceeffdcf21924d5503527ab3886)

__Date__:  Fri Jun 30 12:14:50 2023 -0700

__Title__:  Update Dockerfile.base ([#485](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/485))

latest version has some scheduler fixes

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {621, '621:625', '885fec0a6b0e31f6fe488f2dcd6063d3c913f3c1'})

### Run ID 621:625

__Changeset__: [885fec0a6b0e31f6fe488f2dcd6063d3c913f3c1](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/885fec0a6b0e31f6fe488f2dcd6063d3c913f3c1)

__Date__:  Thu Jun 29 18:13:14 2023 -0700

__Title__:  Preliminary Classifier Algorithms ([#478](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/478))

* Add transit point count test

* Clean up print statements

* implement symmetry_wl, rsdm, perc_rejected algorithms

* implement median_error algorithm

* Make log statements consistent

* Remove print statements:

* Make names consistent and handle exceptions in median_error

* Edit for PEP8 code standards

* Round 2 of PEP8 code standard edits

* Round 3 of PEP8 code standard edits

* Round 4 of PEP8 code standard edits

* Round 5 of PEP8 code standard edits

* Change median_error name

* log warnings instead of raising errors

* Remove TODO

* Fix log statements for pylint compliance

* Remove fstrings

* Group flagging algorithms and state vectors. Add algorithm to summarize flags across targets.

* Round 1 of edits for PEP8 standards

* Round 2 of edits for PEP8 standards

* Round 1 of edits for pylint standards

* Round 2 of edits for pylint standards

* Round 3 of edits for pylint standards

* Round 4 of edits for pylint standards

* Round 5 of edits for pylint standards

* Round 6 of edits for pylint standards

* Remove print statements:

* Add histograms to summarize_flags state vector view

* Adjust figures and remove whitespace

Co-authored-by: Kate E McCarthy <kemccart@mentor3.jpl.nasa.gov>
Co-authored-by: Kate E McCarthy <kemccart@mentor0.jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {620, '620:621', '439308c6c3b081b81ae87d7be66761bc7e45fd35'})

### Run ID 620:621

__Changeset__: [439308c6c3b081b81ae87d7be66761bc7e45fd35](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/439308c6c3b081b81ae87d7be66761bc7e45fd35)

__Date__:  Wed Jun 28 16:15:57 2023 -0700

__Title__:  proceed() test ([#484](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/484))

* High level flag in algo.py

* pip things

Co-authored-by: SDP Pipeline <ortega@jpl.nasa.gov>
Co-authored-by: bryden <bryden@jpl.nasa.gov>
Co-authored-by: Al Niessner <Al.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {616, '616', 'd4e8776aadb66d55bdb2bf0f5e00d3ccb907bc50'})

### Run ID 616

__Changeset__: [d4e8776aadb66d55bdb2bf0f5e00d3ccb907bc50](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/d4e8776aadb66d55bdb2bf0f5e00d3ccb907bc50)

__Date__:  Wed May 10 10:34:28 2023 -0700

__Title__:  Wfc3 update 2023 ([#476](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/476))

* Updated targetlist in edit.py

* Target Scrape 2.0.0

* CIs

Co-authored-by: SDP Pipeline <ortega@jpl.nasa.gov>
Co-authored-by: bryden <bryden@jpl.nasa.gov>
Co-authored-by: Al Niessner <Al.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {596, '596', '833c2439ceff87771aea887223b5ff441d967111'})

### Run ID 596

__Changeset__: [833c2439ceff87771aea887223b5ff441d967111](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/833c2439ceff87771aea887223b5ff441d967111)

__Date__:  Mon Apr 24 11:49:34 2023 -0700

__Title__:  add Ariel targets ([#466](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/466))

* add Ariel targets

* whitespace

* unused param

* updated edit version

* remove .01 from TOI names

* a bunch of new forcepars

Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {592, '592', '8271a255cd2f99d6db257012a9baaece7ba8f05f'})

### Run ID 592

__Changeset__: [8271a255cd2f99d6db257012a9baaece7ba8f05f](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/8271a255cd2f99d6db257012a9baaece7ba8f05f)

__Date__:  Tue Apr 18 01:58:07 2023 -0700

__Title__:  462 data validation ([#463](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/463))

* log removed from Lstar

* removing redundant forcing of parameter values

* 7 new params downloaded from exoplanet archive

* non-mandatory params included

* print summary moved to the end

* consistency checks

* new mass-radius relation; Lstar derivation

* assumed mass-radius relation

* remove whitespace

* remove whitespace

* missing doc string

* whitespace

* moving consistency check to end

* moving consistency check to end

* a bit more ppar redundancy cleaning

Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {591, '591', '5c20fcd1e3ed3ea64e6592326f15f878b9da0761'})

### Run ID 591

__Changeset__: [5c20fcd1e3ed3ea64e6592326f15f878b9da0761](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/5c20fcd1e3ed3ea64e6592326f15f878b9da0761)

__Date__:  Tue Mar 7 08:56:10 2023 -0800

__Title__:  Cerberus release fixes ([#453](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/453))

* Update JWST

* Fixed Multiplanet systems

* CIs

* Update states.py

Editorial to get jenkins to fire off

* Update states.py

Another editorial to spark Jenkins into action.

* Update states.py

Another editorial now that jenkins has been updated.

Co-authored-by: SDP Pipeline <ortega@jpl.nasa.gov>
Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {589, '589', 'b23aed7432915369ab81eef50abd4616de33ffad'})

### Run ID 589

__Changeset__: [b23aed7432915369ab81eef50abd4616de33ffad](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/b23aed7432915369ab81eef50abd4616de33ffad)

__Date__:  Mon Dec 19 07:16:22 2022 -0800

__Title__:  Update Dockerfile.base ([#452](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/452))

* Update Dockerfile.base

latest version

* Update algorithms.py

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {582, '582', 'bc392a225a973aa39290ac13c61a1c2221dd1d8e'})

### Run ID 582

__Changeset__: [bc392a225a973aa39290ac13c61a1c2221dd1d8e](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/bc392a225a973aa39290ac13c61a1c2221dd1d8e)

__Date__:  Fri Dec 16 17:39:56 2022 -0800

__Title__:  Update core.py ([#442](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/442))

need to update load opacity data too

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {582, '582', 'f5eff4a9ef58186f06d81b2712b44538df40e9ff'})

### Run ID 582

__Changeset__: [f5eff4a9ef58186f06d81b2712b44538df40e9ff](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/f5eff4a9ef58186f06d81b2712b44538df40e9ff)

__Date__:  Fri Dec 16 16:31:24 2022 -0800

__Title__:  issue 439 injection ([#440](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/440))

* newest matplotlib is less repetitive

* inject taurex spectrum

Using GJ 1214, injected a spectrum and changed the target name to 'GJ 1214(taurex something something)'. This required a framework for taurex that will allow for its expansion to more targets and different places in the pipeline. It mirrors that developed by @groudier in the rest of excalibur for easier consumption by those used to that coding style.

Used the new ds.retarget() ability to return not just these items as the new target name but historical items too. In this specific case system.finalize.

Lastly, connected cerberus to the state vectors hopefully in a meaningful way.

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {578, '578', '4cde14ecd36c267805e4ec060c4cf8fffb040330'})

### Run ID 578

__Changeset__: [4cde14ecd36c267805e4ec060c4cf8fffb040330](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/4cde14ecd36c267805e4ec060c4cf8fffb040330)

__Date__:  Tue Nov 22 16:18:09 2022 -0800

__Title__:  overhaul of Exoplanet Archive scraping ([#438](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/438))

* scrape overhaul

* remove whitespace

* some formatting stuff

* new version numbers

* whitespace fix

Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {574, '574', 'b2330e138cf991b1813a4a3b8a683d1f564ec2af'})

### Run ID 574

__Changeset__: [b2330e138cf991b1813a4a3b8a683d1f564ec2af](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/b2330e138cf991b1813a4a3b8a683d1f564ec2af)

__Date__:  Tue Oct 18 14:16:58 2022 -0700

__Title__:  Update algorithms.py ([#436](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/436))

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {564, '564', 'a7905b7518fcefe53544cf6442db3b11c73cd363'})

### Run ID 564

__Changeset__: [a7905b7518fcefe53544cf6442db3b11c73cd363](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/a7905b7518fcefe53544cf6442db3b11c73cd363)

__Date__:  Sun Jul 31 11:51:09 2022 -0700

__Title__:  Handing empty SV lists and empty keys in Cerberus.release SV ([#421](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/421))

* Handling empty task SV list + cerberus.release v111

* CI stuff

Co-authored-by: SDP Pipeline <ortega@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {558, '558', '45c139517239d606d212ddd317b024b8eb4412d4'})

### Run ID 558

__Changeset__: [45c139517239d606d212ddd317b024b8eb4412d4](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/45c139517239d606d212ddd317b024b8eb4412d4)

__Date__:  Wed Jul 27 15:05:30 2022 -0700

__Title__:  Cerberus release + target task fixes ([#413](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/413))

* Trick CI and with statement from urlib.urlrequest

* added 6 and 7

* Autofill Fix

* CI checks

* Fix NEXSCI keyword mapping

* NEXSCI keywords mapping update + Cerberus release 2021

Co-authored-by: SDP Pipeline <ortega@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {555, '555', 'c4a010cfbbb0c0b771a2679868ce9160405badf7'})

### Run ID 555

__Changeset__: [c4a010cfbbb0c0b771a2679868ce9160405badf7](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/c4a010cfbbb0c0b771a2679868ce9160405badf7)

__Date__:  Mon Apr 25 10:23:19 2022 -0700

__Title__:  Fixing Failures in the pipeline for merged spectra ([#397](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/397))

* Included abs values on offsets

* last updates

* Merged spec SV changes

* changing filters to only HST

* updates

* Changed transit.spectra version to 1.3.2

* remove single modle and verbose mode from cerberus

Co-authored-by: groudier <gael.m.roudier@jpl.nasa.gov>
Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>
Co-authored-by: Al Niessner <Al.Niessner@jpl.nasa.gov>
Co-authored-by: restrela <restrela@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {539, '539:542', '9b7fb21b952db2567c5ed2f277649125b9e0ea02'})

### Run ID 539:542

__Changeset__: [9b7fb21b952db2567c5ed2f277649125b9e0ea02](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/9b7fb21b952db2567c5ed2f277649125b9e0ea02)

__Date__:  Tue Feb 15 08:17:27 2022 -0800

__Title__:  Many to one ([#398](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/398))

* added plotting dependency

* new lc model and fitting

* initial test

* ci checks

* new ancillary and new archive download

* fix pep3 crap

* more pep3 crap

* more formatting crap

* pylint

* more formatting crap

* ci status

* reset status

* pylint stuff

* 3 params required for mmwmin

* logged L* raised 10^x

* docker fixes

* Update algorithms.py

* cleaned conditional loop for multi-named targets

* new version number

* remove whitespace

* unused var

Co-authored-by: Kyle A. Pearson <kyle.a.pearson@nasa.jpl.gov>
Co-authored-by: bryden <bryden@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {535, '535:538', '9547bf0b80bd0576fb84bdfd4ce11b47556e4377'})

### Run ID 535:538

__Changeset__: [9547bf0b80bd0576fb84bdfd4ce11b47556e4377](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/9547bf0b80bd0576fb84bdfd4ce11b47556e4377)

__Date__:  Wed Jan 19 14:46:36 2022 -0800

__Title__:  New version on Transit.Spectrum ([#394](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/394))

* Updating version on Transit.Spectrum

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {534, '534', 'b98dd1e50a29ffe29be3b59d8e2be9b6cb9b7954'})

### Run ID 534

__Changeset__: [b98dd1e50a29ffe29be3b59d8e2be9b6cb9b7954](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/b98dd1e50a29ffe29be3b59d8e2be9b6cb9b7954)

__Date__:  Tue Jan 18 15:39:00 2022 -0800

__Title__:  Merged spectra - G141 as a baseline ([#393](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/393))

* updated version of Cerberus with the merged spectra capability

Co-authored-by: restrela <restrela@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {524, '524', '5225756defb20ba75b16aa98ded0b1211f61ae41'})

### Run ID 524

__Changeset__: [5225756defb20ba75b16aa98ded0b1211f61ae41](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/5225756defb20ba75b16aa98ded0b1211f61ae41)

__Date__:  Wed Jul 21 14:05:49 2021 -0400

__Title__:  Issue377 ([#381](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/381))

* updated version number

Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {524, '524', 'e6df8996edd712200dbc443eae76b7f13d731e5c'})

### Run ID 524

__Changeset__: [e6df8996edd712200dbc443eae76b7f13d731e5c](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/e6df8996edd712200dbc443eae76b7f13d731e5c)

__Date__:  Tue Jul 20 14:55:40 2021 -0700

__Title__:  added simulated data state vector ([#378](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/378))

* added simulated data state vector

* Bug fixes for data simulation

* modified regressor to analyze previous midtransit times

* yes, it is correct

* added KDE for data sim

* made table more concise

Co-authored-by: Subhash C Kantamneni <Subhash.C.Kantamneni@jpl.nasa.gov>
Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {519, '519:523', '628c5bd2d50776e411130efd53b13a0f276fe351'})

### Run ID 519:523

__Changeset__: [628c5bd2d50776e411130efd53b13a0f276fe351](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/628c5bd2d50776e411130efd53b13a0f276fe351)

__Date__:  Wed Jun 30 10:45:13 2021 -0700

__Title__:  Merged spectra on transit.core and Cerberus offsets for the merged spectra ([#373](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/373))

* increasing STIS resolution

* STIS higher resolution

* Hazes parameters free

* Removing comment

* Removing comment

* changing resolution

* removing spitzer

* HST merged extension

* Last updates merged spec

* Last updates pymc cerberus

* Merged spectrum

* STIS merged spec

* Merged Spectrum offsets

* Last changes merged spectrum to adapt to code standard checking

* Merged spectra - Code checking - sucess

* Merged spectra - solving for Gaels comments before merging code

* Incorporating changes in the ATMOS and SPECTRUM versions

Co-authored-by: groudier <gael.m.roudier@jpl.nasa.gov>
Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>
Co-authored-by: Al Niessner <Al.Niessner@jpl.nasa.gov>
Co-authored-by: restrela <restrela@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {518, '518', '8673a213223a8bdfbb78991e4a25f2ca10639c95'})

### Run ID 518

__Changeset__: [8673a213223a8bdfbb78991e4a25f2ca10639c95](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/8673a213223a8bdfbb78991e4a25f2ca10639c95)

__Date__:  Mon May 24 11:03:27 2021 -0700

__Title__:  Issue251 ([#372](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/372))

* Bug fix

This change didn't go through in the last commit.

* Version update

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {517, '517', '003f46d7eb1be2ec725decbb3f6c2da3ddee46b6'})

### Run ID 517

__Changeset__: [003f46d7eb1be2ec725decbb3f6c2da3ddee46b6](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/003f46d7eb1be2ec725decbb3f6c2da3ddee46b6)

__Date__:  Fri May 21 14:15:07 2021 -0700

__Title__:  Issue251 ([#371](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/371))

* bug fixes to show full string as prediction

* Version update

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {511, '511', 'c0b290d140d9422cf8e8fa922f7dccbf0391a272'})

### Run ID 511

__Changeset__: [c0b290d140d9422cf8e8fa922f7dccbf0391a272](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/c0b290d140d9422cf8e8fa922f7dccbf0391a272)

__Date__:  Mon Mar 8 14:20:23 2021 -0800

__Title__:  Issue251 ([#368](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/368))

* eclipse sv update debug

* adding eclipse targets

* adding eclipse products

Co-authored-by: virishat <virishat@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {510, '510', '1925e1be39638f54b60c56fe073f35af5f9a59db'})

### Run ID 510

__Changeset__: [1925e1be39638f54b60c56fe073f35af5f9a59db](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/1925e1be39638f54b60c56fe073f35af5f9a59db)

__Date__:  Mon Feb 1 22:17:04 2021 -0800

__Title__:  adding eclipse targets and other bug fixes ([#366](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/366))

Co-authored-by: virishat <virishat@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {509, '509', '96a0bfa89b0d7aea1c5d9c03b4f76a51edf66442'})

### Run ID 509

__Changeset__: [96a0bfa89b0d7aea1c5d9c03b4f76a51edf66442](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/96a0bfa89b0d7aea1c5d9c03b4f76a51edf66442)

__Date__:  Tue Nov 24 09:39:09 2020 -0800

__Title__:  Fixing Filter + SV Plot ([#360](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/360))

* ci checks + phase curve algorithms

* fix bad conflict merge (most likely)

* incorrect fix for dynamic attributes

* versions

* ci check fix; dynamic attributes

* fix pylint errors

The persistent errors are from generated attributes. Two problems with this are the rename with a from-import-as that later confounds pylint if it has been added to generate-members in pylintrc and the generated members to start with.

First, added the full name to the pylintrc. Second, went through phasecurve.core and data.core removing the renames as the shortnames with the canonical names.

* new target list

* dependecy quick fix

* merge conflicts

* merge fix

* removing function

* removing library

* cleaning up imports

* no jwst, fix sv plot

* versions

* no jwst filter

* dependency fix

* comments

* plotting library

* original

* ci checks

* sampler log evidence

Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>
Co-authored-by: Kyle A. Pearson <kyle.a.pearson@nasa.jpl.gov>
Co-authored-by: Gael M Roudier <Gael.M.Roudier@jpl.nasa.gov>
Co-authored-by: Noah Huber-Feely <noah.l.huber-feely@jpl.nasa.gov>
Co-authored-by: Al Niessner <Al.Niessner@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {507, '507', '995a72c6f95426430a8bbd3797c31be9bc9cc56d'})

### Run ID 507

__Changeset__: [995a72c6f95426430a8bbd3797c31be9bc9cc56d](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/995a72c6f95426430a8bbd3797c31be9bc9cc56d)

__Date__:  Mon Oct 26 14:41:56 2020 -0700

__Title__:  Trigger transit.norm ([#363](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/363))

* Trigger Norm

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {489, '489:501', 'c4daa7283f09792a7a63fc5b3ab096709743ebb1'})

### Run ID 489:501

__Changeset__: [c4daa7283f09792a7a63fc5b3ab096709743ebb1](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/c4daa7283f09792a7a63fc5b3ab096709743ebb1)

__Date__:  Tue Oct 13 08:42:59 2020 -0700

__Title__:  JWST + Targets + Spitzer Phasecurve ([#354](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/354))

* ci checks + phase curve algorithms

* fix bad conflict merge (most likely)

* incorrect fix for dynamic attributes

* versions

* ci check fix; dynamic attributes

* fix pylint errors

The persistent errors are from generated attributes. Two problems with this are the rename with a from-import-as that later confounds pylint if it has been added to generate-members in pylintrc and the generated members to start with.

First, added the full name to the pylintrc. Second, went through phasecurve.core and data.core removing the renames as the shortnames with the canonical names.

* new target list

Co-authored-by: Kyle A. Pearson <kyle.a.pearson@nasa.jpl.gov>
Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>
Co-authored-by: Al Niessner <Al.Niessner@jpl.nasa.gov>
Co-authored-by: Gael M Roudier <Gael.M.Roudier@jpl.nasa.gov>
Co-authored-by: Noah Huber-Feely <noah.l.huber-feely@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {487, '487', '3b342507fa2f78416f740349b987b3f538835dbf'})

### Run ID 487

__Changeset__: [3b342507fa2f78416f740349b987b3f538835dbf](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/3b342507fa2f78416f740349b987b3f538835dbf)

__Date__:  Thu Oct 8 15:39:01 2020 -0700

__Title__:  issue357: fix pylint ([#358](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/358))

* Fixed system and edit errors

* Fixed CI

* Update algorithms.py

* Data Collect assessment

* fix pylint

Seems that changes to module isort have made the older pylint fail. Backed up isort in the cit docker image to a version that should work and it does.

Added a positive check to check_02 that requires pylint to successfully run to allow a success.

* passes CI1 and 2

* moved positive check before filtering

Co-authored-by: Gael M Roudier <Gael.M.Roudier@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {463, '463', 'f94fdf9555192a901be4e7b3c22e1a8478cef875'})

### Run ID 463

__Changeset__: [f94fdf9555192a901be4e7b3c22e1a8478cef875](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/f94fdf9555192a901be4e7b3c22e1a8478cef875)

__Date__:  Fri Aug 21 16:08:57 2020 -0500

__Title__:  transit.population SV malformity support ([#349](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/349))

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {463, '463', 'f314153e9de033a8eef92950512b0afdec4f176e'})

### Run ID 463

__Changeset__: [f314153e9de033a8eef92950512b0afdec4f176e](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/f314153e9de033a8eef92950512b0afdec4f176e)

__Date__:  Fri Aug 21 08:39:58 2020 -0500

__Title__:  quick patch to transit.population ([#348](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/348))

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {463, '463', '46c01b1dcb452ddd854c1d87a324c9bf24228add'})

### Run ID 463

__Changeset__: [46c01b1dcb452ddd854c1d87a324c9bf24228add](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/46c01b1dcb452ddd854c1d87a324c9bf24228add)

__Date__:  Thu Aug 20 19:39:41 2020 -0500

__Title__:  Transit Instrument Model Statistics ([#346](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/346))

* Add instrument wide IM analysis

* add Lorentzian and Gaussian fits

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {462, '462', '366395eb364f43ea22bc76c582de25d15135a6b8'})

### Run ID 462

__Changeset__: [366395eb364f43ea22bc76c582de25d15135a6b8](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/366395eb364f43ea22bc76c582de25d15135a6b8)

__Date__:  Thu Aug 20 17:59:18 2020 -0500

__Title__:  ancillary.population Aspects patch ([#347](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/347))

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {462, '462', '77bff7ea272dc1f6ec76d392a422ed37459709e8'})

### Run ID 462

__Changeset__: [77bff7ea272dc1f6ec76d392a422ed37459709e8](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/77bff7ea272dc1f6ec76d392a422ed37459709e8)

__Date__:  Thu Aug 20 16:27:56 2020 -0500

__Title__:  dawgie bug work around for ancillary branch ([#345](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/345))

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {442, '442:452', '7817713a4034e5963fb99cbfb6533f96468f9668'})

### Run ID 442:452

__Changeset__: [7817713a4034e5963fb99cbfb6533f96468f9668](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/7817713a4034e5963fb99cbfb6533f96468f9668)

__Date__:  Mon Aug 17 15:50:47 2020 -0700

__Title__:  Adding JWST filter + SV view bug fix + code prep  ([#344](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/344))

* new statevector view

* fixed syntax issue

* new versions

* update to sv view

* JWST ingest

* removed pdb

* updates

* removed phasecurve stuff

* og phase curve alg

* new filter

* clean up

* clean up

* clean up

* ci check

Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>
Co-authored-by: Gael M Roudier <Gael.M.Roudier@jpl.nasa.gov>
Co-authored-by: Noah L Huber-Feely <Noah.L.Huber-Feely@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {441, '441', '4a39700c4806b8199dee4ed12841a5ad009ba784'})

### Run ID 441

__Changeset__: [4a39700c4806b8199dee4ed12841a5ad009ba784](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/4a39700c4806b8199dee4ed12841a5ad009ba784)

__Date__:  Thu Aug 13 16:44:14 2020 -0500

__Title__:  Ancillary computation branch ([#338](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/338))

* add central ancillary branch framework

* add Teq computation to ancillary branch

* add population estimate distribution analysis algorithm

* support categorical attributes in ancillary branch

* refactor to subclass based estimator definition

* make ancillary estimator addition easier and improve visualization

* add exception handling and estimate CIs

* add estimator abort functionality and method reference

* add Tsun constant to constant dictionary

* resolve linter errors and clean code

* appease the pylint

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {437, '437:440', 'e1581e0e5c285a1a2979e2377b8b681e1e6b5f4d'})

### Run ID 437:440

__Changeset__: [e1581e0e5c285a1a2979e2377b8b681e1e6b5f4d](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/e1581e0e5c285a1a2979e2377b8b681e1e6b5f4d)

__Date__:  Thu Aug 6 14:52:11 2020 -0700

__Title__:  Issue340: update to latest matplotlib ([#342](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/342))

* move to latest matplotlib

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {437, '437', 'd6c64cc2508a4766649b70fa4be54c1637f1840c'})

### Run ID 437

__Changeset__: [d6c64cc2508a4766649b70fa4be54c1637f1840c](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/d6c64cc2508a4766649b70fa4be54c1637f1840c)

__Date__:  Tue Aug 4 09:27:17 2020 -0700

__Title__:  Spitzer Error with state vector view on data task ([#339](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/339))

* new statevector view

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {437, '437', 'fc6a3dade265e1df99a4ef5481d325c9a4693d3f'})

### Run ID 437

__Changeset__: [fc6a3dade265e1df99a4ef5481d325c9a4693d3f](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/fc6a3dade265e1df99a4ef5481d325c9a4693d3f)

__Date__:  Fri Jul 24 14:18:35 2020 -0700

__Title__:  Version updates for Spitzer ([#336](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/336))

* version updates

* new pymc version

* new dep

* new libs

* make PyMC3 trace saving compatible with new vers

After a Pandas update, PyMC3 (v3.8) now produces a
different key format for array classifiers so this
takes the new format (i.e. name[i]) and converts the
key to the previous format (i.e. name__i)

Co-authored-by: Albert F Niessner <Albert.F.Niessner@jpl.nasa.gov>
Co-authored-by: Gael M Roudier <Gael.M.Roudier@jpl.nasa.gov>
Co-authored-by: Noah L Huber-Feely <Noah.L.Huber-Feely@jpl.nasa.gov>

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {428, '428', '2e487346abfab03fe9c5594f8024dc7557e84db5'})

### Run ID 428

__Changeset__: [2e487346abfab03fe9c5594f8024dc7557e84db5](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/2e487346abfab03fe9c5594f8024dc7557e84db5)

__Date__:  Sun Jul 12 16:21:57 2020 -0700

__Title__:  Fixed bug in cerberus xslib ([#334](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/334))

* xslib v113: Fixed bug overwriting planet variable p

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {427, '427', 'b34bcedb35a5ae432a335fc3970376f0bd50b330'})

### Run ID 427

__Changeset__: [b34bcedb35a5ae432a335fc3970376f0bd50b330](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/b34bcedb35a5ae432a335fc3970376f0bd50b330)

__Date__:  Thu Jul 9 13:31:39 2020 -0500

__Title__:  [316_Noah] add predicted timing model start ([#331](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/331))

Use empirically derived model for start parameter prediction

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {426, '426', '194c95ba4f023c66e4a6b4d7b4ebb3baf8226eeb'})

### Run ID 426

__Changeset__: [194c95ba4f023c66e4a6b4d7b4ebb3baf8226eeb](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/194c95ba4f023c66e4a6b4d7b4ebb3baf8226eeb)

__Date__:  Tue Jul 7 21:15:45 2020 -0400

__Title__:  Building Interpolator to Speed Up HITEMP CH4 Processing  ([#332](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/332))

* Added interpolator for cross sections to speed up retrieval for HITEMP CH4

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {425, '425', '1ce4c5c4b81abed57121e6c641fec171e02dc08f'})

### Run ID 425

__Changeset__: [1ce4c5c4b81abed57121e6c641fec171e02dc08f](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/1ce4c5c4b81abed57121e6c641fec171e02dc08f)

__Date__:  Tue Jun 30 14:14:03 2020 -0400

__Title__:  Making retrieval use HITEMP CH4 line list instead of Exomol ([#330](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/330))

* Added CH4 to HITEMP species
* Edited ATMOS priors
* Making retrieval use HITEMP CH4 line list instead of Exomol

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {424, '424', 'e1e701c67cc53f5d807f545792e4de45af1f6169'})

### Run ID 424

__Changeset__: [e1e701c67cc53f5d807f545792e4de45af1f6169](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/e1e701c67cc53f5d807f545792e4de45af1f6169)

__Date__:  Fri Jun 26 16:58:31 2020 -0500

__Title__:  [316_Noah] add spectrum trace to SV ([#329](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/329))

To perform analysis of the estimated posterior, the MCMC sample
chain is now added to transit.spectrum SV

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {423, '423', '64dd64f3da69f5573655b917b6a058ec3de5986b'})

### Run ID 423

__Changeset__: [64dd64f3da69f5573655b917b6a058ec3de5986b](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/64dd64f3da69f5573655b917b6a058ec3de5986b)

__Date__:  Thu Jun 25 13:11:38 2020 -0400

__Title__:  Added CH4 to HITEMP species ([#328](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/328))

* Added CH4 to HITEMP species

* Edited ATMOS priors

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {422, '422', '01c0b266558f50b91b8429a64650ec4666fb6f3a'})

### Run ID 422

__Changeset__: [01c0b266558f50b91b8429a64650ec4666fb6f3a](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/01c0b266558f50b91b8429a64650ec4666fb6f3a)

__Date__:  Wed Jun 24 16:36:16 2020 -0500

__Title__:  [316_Noah] add the fit Lorentzian priors ([#327](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/327))

This tests the first iteration of the updated priors
with the primary update being much tighter variances on the priors
and a Lorentzian rather than Normal distribution

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {420, '420', '7ac8ee99f7ac65063d71c637ce5b41a9cf6342a6'})

### Run ID 420

__Changeset__: [7ac8ee99f7ac65063d71c637ce5b41a9cf6342a6](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/7ac8ee99f7ac65063d71c637ce5b41a9cf6342a6)

__Date__:  Wed Jun 17 14:31:45 2020 -0500

__Title__:  [316_Noah] fix upstream Spitzer error for new transit.calibration change ([#324](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/324))

* [316_Noah] add saving of hstbreath into sv

* [316_Noah] return spitzer and update version

* Addresses downstream error because of Spitzer removal
* Updates version after transit.normalization sv got hstbreath added

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {416, '416', '6ca3fabc232becb7fde0a0995d4d63a5dcf4c178'})

### Run ID 416

__Changeset__: [6ca3fabc232becb7fde0a0995d4d63a5dcf4c178](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/6ca3fabc232becb7fde0a0995d4d63a5dcf4c178)

__Date__:  Wed Jun 3 14:15:19 2020 -0700

__Title__:  Closes 296 cerberus ([#315](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/315))

* Augmented TEC model and Photochem in Atmos
* Reenabled Eclipse
* Disabled Spitzer

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {410, '410:413', '589f29468471b1bf27575d6beb27b04f553cf40a'})

### Run ID 410:413

__Changeset__: [589f29468471b1bf27575d6beb27b04f553cf40a](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/589f29468471b1bf27575d6beb27b04f553cf40a)

__Date__:  Wed Apr 22 15:59:49 2020 -0700

__Title__:  Manual trigger for new priors ([#309](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/309))

* need manual trigger...

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {404, '404', '197e11c00b0813a482d75e7505c9a5c5b2a225b4'})

### Run ID 404

__Changeset__: [197e11c00b0813a482d75e7505c9a5c5b2a225b4](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/197e11c00b0813a482d75e7505c9a5c5b2a225b4)

__Date__:  Tue Mar 31 14:05:42 2020 -0700

__Title__:  G430 - low resolution ([#307](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/307))

* STIS G430 - lowing down resolution

* Adding STIS to Cerberus

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {403, '403', '043f757b020ad42a816782c5b6fabc8289cbbaa5'})

### Run ID 403

__Changeset__: [043f757b020ad42a816782c5b6fabc8289cbbaa5](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/043f757b020ad42a816782c5b6fabc8289cbbaa5)

__Date__:  Mon Mar 23 14:25:27 2020 -0700

__Title__:  A few Spitzer updates ([#306](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/306))

* removed inclination fitting from transit, increased links, downsample data before fit, new ramp model
* adding spitzer

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {402, '402', 'b63e8e5f85331fe74db25ae8e0faa31c9be4ceaf'})

### Run ID 402

__Changeset__: [b63e8e5f85331fe74db25ae8e0faa31c9be4ceaf](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/b63e8e5f85331fe74db25ae8e0faa31c9be4ceaf)

__Date__:  Tue Mar 17 11:07:32 2020 -0700

__Title__:  G430 Run ([#305](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/305))

* G430 - remove debug mode from spec selection

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {398, '398', '8523fd0922a4ebc2f1a25e6367fa32b9677fef93'})

### Run ID 398

__Changeset__: [8523fd0922a4ebc2f1a25e6367fa32b9677fef93](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/8523fd0922a4ebc2f1a25e6367fa32b9677fef93)

__Date__:  Tue Mar 10 15:22:14 2020 -0700

__Title__:  G430L correction ([#302](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/302))

* G430L calibration correction
* G430L calibration only

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {397, '397', 'e68d90fdfd1d74c66e8f46921a7f8dd8831531f8'})

### Run ID 397

__Changeset__: [e68d90fdfd1d74c66e8f46921a7f8dd8831531f8](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/e68d90fdfd1d74c66e8f46921a7f8dd8831531f8)

__Date__:  Mon Mar 9 17:01:43 2020 -0700

__Title__:  Updates in G430L ([#301](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/301))

* Spitzer off
* Removed throughput scaling factor in STIS wavelength cal

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {394, '394:396', '541725c174bdc0f8a38842b4a0bc6f36b633e41a'})

### Run ID 394:396

__Changeset__: [541725c174bdc0f8a38842b4a0bc6f36b633e41a](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/541725c174bdc0f8a38842b4a0bc6f36b633e41a)

__Date__:  Tue Feb 25 16:59:00 2020 -0700

__Title__:  New state vector versions, eclipse model updates ([#300](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/300))

* SV new version

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {393, '393', '49e99174c0242dd575de90164cc3a95dce7e8465'})

### Run ID 393

__Changeset__: [49e99174c0242dd575de90164cc3a95dce7e8465](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/49e99174c0242dd575de90164cc3a95dce7e8465)

__Date__:  Tue Feb 25 13:01:05 2020 -0800

__Title__:  Issue251 ([#299](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/299))

* updating the view fields

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {389, '389:393', '4d69ac12911f584acf76fdfae19aa9237e0644ef'})

### Run ID 389:393

__Changeset__: [4d69ac12911f584acf76fdfae19aa9237e0644ef](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/4d69ac12911f584acf76fdfae19aa9237e0644ef)

__Date__:  Wed Feb 19 14:02:40 2020 -0700

__Title__:  New priors, state vectors not updating ([#298](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/298))

* Spitzer priors
* updated versions

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {377, '377', 'fba372fa24a8eddf47adcd61e4007b8674468091'})

### Run ID 377

__Changeset__: [fba372fa24a8eddf47adcd61e4007b8674468091](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/fba372fa24a8eddf47adcd61e4007b8674468091)

__Date__:  Wed Feb 5 12:11:40 2020 -0800

__Title__:  STIS G430+G750L same calibration ([#293](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/293))

* STIS G750+G430 - now including Spitzer back

* Versioned Raissa calibration

* Test STIS - Spitzer out

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {367, '367', '113cd8090fbf8837e42f160ccdb228f9ceaf5bdf'})

### Run ID 367

__Changeset__: [113cd8090fbf8837e42f160ccdb228f9ceaf5bdf](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/113cd8090fbf8837e42f160ccdb228f9ceaf5bdf)

__Date__:  Fri Jan 17 13:33:09 2020 -0800

__Title__:  files need to be changed in sync ([#288](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/288))

* files need to be changed in sync

* try old joblib again

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {367, '367', '8ac8ae235225cc5fb56780c9f58ad6aadb290722'})

### Run ID 367

__Changeset__: [8ac8ae235225cc5fb56780c9f58ad6aadb290722](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/8ac8ae235225cc5fb56780c9f58ad6aadb290722)

__Date__:  Thu Jan 16 15:55:15 2020 -0800

__Title__:  Issue251: Changing __init__.py file ([#283](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/283))

* fix __init__

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {361, '361:363', '2b14569a591b08c7ee5367b3af2849266287d402'})

### Run ID 361:363

__Changeset__: [2b14569a591b08c7ee5367b3af2849266287d402](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/2b14569a591b08c7ee5367b3af2849266287d402)

__Date__:  Wed Dec 18 16:07:07 2019 -0800

__Title__:  Issue170 ([#234](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/234))

* new PSF photometry models

* light curve fitter

* 4.5 is now an active filter

* added capability for 4.5 micron data

* eclipses and 4.5 data now supported

* Added phasecurve timing to data; started adding in phasecurve model fitting to new task: phasecurve

* Added phasecurve normalization

* Phasecurve normalize seems to be working. More work needed on pcwhitelight, especially the model.

* Decreased MCMC runtime by 4x by fixing Pixel Map calculation

* overwrote parameters, faster weighted flux calc

* Updated MCMC to force-use 8 cores; tweaked priors on phasecurve; trying to also add in WASP-77A

* Added ramp correction.

* Chop off first hour of data.

* Pushing Jenkins fixes to phasecurve.

* Debug and Verbose to False. 55 Cnc added back in.

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {307, '307', '0728abff7be4e3d3e54db2f056e21bbe2c0d2f19'})

### Run ID 307

__Changeset__: [0728abff7be4e3d3e54db2f056e21bbe2c0d2f19](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/0728abff7be4e3d3e54db2f056e21bbe2c0d2f19)

__Date__:  Fri Dec 13 15:27:45 2019 -0800

__Title__:  Spitzer updates ([#252](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/252))

* prepping for composite plot

* composite plot...needs debugging

* changed eclipse filters, no eclipst hst, spectrum plots

* fixing up plots

* ci checks

* maybe plots will work

* chain lengths

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {188, '188', '16bdd835708d7f3798f767627a911ec5d836093f'})

### Run ID 188

__Changeset__: [16bdd835708d7f3798f767627a911ec5d836093f](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/16bdd835708d7f3798f767627a911ec5d836093f)

__Date__:  Fri Nov 1 11:25:20 2019 -0700

__Title__:  Issue208: aspect of regression ([#216](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/216))

* Update to latest dawgie

Need fixes for the scaling to get runID back into the logs via version number changes.

Need changes to scheduler to support new request of an aspect of regressions.

* update target framework

Added the regression target.variations_of to read data from the target.autofill.parameters state vector. The skeletal structure is required now so that notebook page can retrieve the data for developing the run() action.

While expanding the structure for regression, added the aspect as well. The aspect works on the information generated by the regression.

* fill in the structure

Added excalibur.target.monitor to contain the new code for regression and aspect. Kept it out of core on purpose so that readers expect a slightly different coding style as well as content. core.py contains science code while monitor code is less science and more process.

Add excalibur.target.states.MonitorSV(). The original skeleton reused an existing SV but it was not appropriate for the monitor.

Updated excalibur.target.algorithms.Regression to include feedback(). This complicates things a tad but shows the use of it. Previously known infomration from the regression is passed into excalibur.target.monitor.regress() so that the loop over the timeline is as short as it can be. Normally a function like this would take more time on every cycle than it does when truncating at know run ids.

* fill in the alert

Worked through the aspect and filled in how it extracts the latest value from the regression and compares it to what it knows from last time. If it detects a change it will send an email or write an exception to the log. The aspect will always persist showing all of the latest parameters of concern for every target and and every planet of that target. A list will be at the top summarizing what the last changes are which is the same list that goes out via email.

* tested

Ran all of it in a notebook page. It works with the exception of email from the notebook. However email does seem to work otherwise. Might be something with the Jupyter container that is causing the issue. Put an exception block to handle the email failure.

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {178, '178', '75dafc5a3b445e9df24199c594549e3d895e8099'})

### Run ID 178

__Changeset__: [75dafc5a3b445e9df24199c594549e3d895e8099](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/75dafc5a3b445e9df24199c594549e3d895e8099)

__Date__:  Wed Oct 23 15:59:58 2019 -0700

__Title__:  version to trigger autofill ([#219](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/219))

* manual trigger to autofill

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {163, '163:175', '787f2141dc71d5803f74edb64c53fbf3303b62c5'})

### Run ID 163:175

__Changeset__: [787f2141dc71d5803f74edb64c53fbf3303b62c5](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/787f2141dc71d5803f74edb64c53fbf3303b62c5)

__Date__:  Tue Oct 22 16:27:49 2019 -0700

__Title__:  Fixes 3 odd balls when merging whitelight + trigger Kyle s run ([#217](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/217))

* Fixed last 3 targets in new whitelight

* Trigger test run for Kyle s changeset

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {154, '154', 'db2036b8dd7c2dcb035cbaf2d3f9b0e89a4f9382'})

### Run ID 154

__Changeset__: [db2036b8dd7c2dcb035cbaf2d3f9b0e89a4f9382](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/db2036b8dd7c2dcb035cbaf2d3f9b0e89a4f9382)

__Date__:  Mon Oct 14 21:55:16 2019 -0700

__Title__:  Global orbital solution prototype ([#203](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/203))

* Prototyped Ghost SV

* Reversed edit.py to production mode

* Ghost in the shell prototype in OPS

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {145, '145', '7ef005198fef24953a27bfde903c215d3aeb7a9e'})

### Run ID 145

__Changeset__: [7ef005198fef24953a27bfde903c215d3aeb7a9e](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/7ef005198fef24953a27bfde903c215d3aeb7a9e)

__Date__:  Thu Sep 26 10:42:35 2019 -0700

__Title__:  Fixed XO-2 random errors ([#190](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/190))

* Fixed XO-2 random errors

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {124, '124:126', 'd3604b40a38b5afc76d0184f81309f80d412b029'})

### Run ID 124:126

__Changeset__: [d3604b40a38b5afc76d0184f81309f80d412b029](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/d3604b40a38b5afc76d0184f81309f80d412b029)

__Date__:  Fri Sep 6 12:33:23 2019 -0700

__Title__:  Adding STIS/G430L - again 2 ([#184](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/184))

* Update G430

* Changed noise threshold back to 5 PN

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {123, '123', 'f4c7b4714400858140d95a62be57a6ecf4ff74f6'})

### Run ID 123

__Changeset__: [f4c7b4714400858140d95a62be57a6ecf4ff74f6](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/f4c7b4714400858140d95a62be57a6ecf4ff74f6)

__Date__:  Tue Sep 3 16:31:42 2019 -0700

__Title__:  TRANSIT.normalization threshold at 7 PN ([#181](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/181))

* Normalization threshold 9 --> 7 PN

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {121, '121:122', '1d29077d33896b0c1b26ac52cd099d1a466c4ad8'})

### Run ID 121:122

__Changeset__: [1d29077d33896b0c1b26ac52cd099d1a466c4ad8](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/1d29077d33896b0c1b26ac52cd099d1a466c4ad8)

__Date__:  Wed Aug 28 17:58:38 2019 -0700

__Title__:  data.timing and transit.normalization upgrades ([#180](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/180))

* DATA.timing upgrade to asymmetric transits

* TRANSIT.normalization updated threshold (5 --> 9 PN) for spectrum rej.

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {119, '119', '7bdd24f8466bd39575b6fc6f53d18cdb3e1fb05c'})

### Run ID 119

__Changeset__: [7bdd24f8466bd39575b6fc6f53d18cdb3e1fb05c](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/7bdd24f8466bd39575b6fc6f53d18cdb3e1fb05c)

__Date__:  Mon Aug 26 18:28:28 2019 -0700

__Title__:  Cerberus haze+spherical shell update: closes issue89  ([#179](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/179))

* Cerberus haze+spherical shell update: closes issue89

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: start rid {117, '117:118', '2942a43c7d18ec86ba262db6c317ef25dc1a2b1a'})

### Run ID 117:118

__Changeset__: [2942a43c7d18ec86ba262db6c317ef25dc1a2b1a](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/commit/2942a43c7d18ec86ba262db6c317ef25dc1a2b1a)

__Date__:  Thu Aug 15 16:49:57 2019 -0700

__Title__:  Cerberus rerun with updated models ([#171](https://github-fn.jpl.nasa.gov/EXCALIBUR/esp/pull/171))

* Nan filling for spectrum outliers
* Atmos new models

[//]: # (DO NOT REMOVE: finish rid)
[//]: # (DO NOT REMOVE: finish list)
