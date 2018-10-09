# Cheat sheet

## max/min/height max/min/width

remove value "unset" from {min-height,min-width,width,height}
> <del>min-height: unset;</del><br>
> height: auto;

remove value "auto" from {min-height,min-width}
> <del>min-height: auto;</del><br>
> min-height: none;

## min-height + flex + IE
A flex container doesn't respect the min-height property in these browsers

### Solution
#### Add flex to parent

Structure
> div.parent > div.child

.parent style

> div.parent {<br>
&nbsp;&nbsp;&nbsp;&nbsp;display: flex;<br>
&nbsp;&nbsp;&nbsp;&nbsp;flex-direction: column;<br>
}

.child style

> div.child {<br>
&nbsp;&nbsp;&nbsp;&nbsp;display: flex;<br>
&nbsp;&nbsp;&nbsp;&nbsp;align-items: center;<br>
&nbsp;&nbsp;&nbsp;&nbsp;justify-content: center;<br>
&nbsp;&nbsp;&nbsp;&nbsp;min-height: 800px<br>
}