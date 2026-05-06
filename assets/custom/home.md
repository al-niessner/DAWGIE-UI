# Welcome to 
<center>
<span style="font-size: 1.5em;">
<b>Ex</b><i>oplanet</i> <b>Cali</b><i>bration</i> <b>B</b><i>ayesian</i> <b>U</b><i>nified</i> <b>R</b><i>etrieval</i> Pipeline
</span>
</center>
where
<center>
<span style="font-size: 1.25em;">
<b><i>the process is the product.</i></b>
</span>
</center>

## Table of Contents

* [Introduction](#excalibur-introduction)
* [Join Our Team](#excalibur-join-our-team)
* [Resource](#excalibur-resources)
* [Reporting Problems](#excalibur-reporting-problems)

---

## Introduction
EXCALIBUR reduces extrasolar system data into an exoplanet spectrum.
It includes CERBERUS, a line by line, plane parallel radiative transfer code modeling exoplanet atmospheres and a Bayesian parameter retrievial / model selection package. 


EXCALIBUR is an event driven pipeline where the events are defined as changes in data or algorithms; when events are detected, dependencies affected by the changes are re-processed. Calibration steps are transparent and quantified using a combination of accessible intermediate products and auto-generation of visual diagnostics.

[More](http://mentor.jpl.nasa.gov:8080/pages/about)

---

## Join Our Team
The steps to join our team:
1. Create a [github](https://github.com)
1. Send an E-Mail to Danny Luong, Mark Swain, Gael Roudier, and Al Niessner requesting:
    1. an account on the mentor cluster
    1. be part of the docker group
    1. be added to the github team and be sure to include your github username/handle
1. Once you have an account on the mentor machines, login to mentor3 and run the script /proj/sdp/bin/welcome.sh. You may run the script as many times as you wish; meaning, if you are returning or unsure just run it again.

---

## Resources

### Custom information, like this page

/proj/sdp/ops/ui/assests/custom

### The mentor cluster

Excalibur executes on the mentor cluster and is made up these nodes:
| Node Name | Primary Purpose |
| :--- | :--- |
| excalibur/mentor/mentor0 | Primary server for the pipeline and auxillary services such as raid, nfsd, apache, and more |
| mentor3 | Primary development node |
| mentor4 | Secondary development node and Jupyter Notebook server |
| mentor5 | Primarily a worker farm of 32 workers |
| mentor6 | Primarily a worker farm of 32 workers |
| mentor7 | Primarily a worker farm of 32 workers |
| mentor10 | Primarily a worker farm of 32 workers |
| mentor11 | Primarily a worker farm of 32 workers |
| mentor12 | Primarily a worker farm of 32 workers |
| mentor13 | Primarily a worker farm of 32 workers |
| mentor14 | Primarily a worker farm of 32 workers |
| mentor15 | Primarily a worker farm of 32 workers |

### Tools

#### Jupyter Notebooks
- [Reroute to working Notebook](https://excalibur.jpl.nasa.gov:8445)
- [Direct to working Noteboot](https://mentor4.jpl.nasa.gov:8445)

#### NFS
nfsd (111) on excalibur/mentor/mentor0 - /proj/{sdp,sdppiped,case,hrd}
#### Postgresql
Port: 5263

---

## Reporting Problems
If you encounter any issues, please document them here:
- [these web pages](https://github.com/nasa-jpl-exoplanet/ESP-UI/issues)
- [pipeline science](https://github.com/nasa-jpl-exoplanet/esp/issues)
- [pipeline behavior](https://github.com/nasa-jpl-exoplanet/DAWGIE/issues)
