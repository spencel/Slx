// Version 0.3

// How do I put an initialization function if the panels are not hard coded objects?
var Data = {

	panelLists: {
		Units_Of_Measurement: [
			"ConvertUnits",
			"SiDimensionSymbols",
			"Magnitude",
			"TimeSymbols",
			"Length",
			"Temperature",
			"Mass",
			"Volume"
		],
		Assembly_Language: [
			"TwosComplimentHexadecimal",
			"MultiplesOf16",
			"PowersOf2",
			"Overflow",
			"UnitConversionsBits"
		],
		Chemistry: [
			"WaterIonization",
			"Acids"
		]
	},

	panelData: {

		WaterIonization: {
			name: "WaterIonization",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'>\
					<table id='panel' class='panel1'>\
						<tr>\
							<th id='panelHeader-{ID}'>{NAME}</th>\
						</tr>\
					</table>\
				</div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'>\
					<table id='panel' class='panel1'>\
						<tbody class='tr-border'>\
							<tr>\
								<th id='panelHeader-{ID}'>{NAME}</th>\
							</tr>\
							<tr>\
								<td><div class='slxMathJax'>\\(\\rm{2H_2O_{(\\it{l})} \\longrightarrow OH^-_{(\\it{aq})} + H_3O^+_{(\\it{aq})}}\\)</div></td>\
							</tr>\
							<tr>\
								<td><div class='slxMathJax'>\\(\\rm{\\textit{K}_w=\\frac{\\displaystyle [OH^-_{(\\it{aq})}][H_3O^+_{(\\it{aq})}]}{\\displaystyle [H_2O_{(\\it{l})}]^2}=10^{-14}\\text{ @ 25 °C, assume }[H_2O] \\approx 1}\\)</div></td>\
							</tr>\
							<tr>\
								<td><div class='slxMathJax'>\\(\\rm{[H^+]=[H_3O^+]}\\)</div></td>\
							</tr>\
							<tr>\
								<td><div class='slxMathJax'>\\(\\rm{p\\textit{K}_w=-log(\\textit{K}_w)=pH+pOH=14\\text{ @ 25 °C}}\\)</div></td>\
							</tr>\
							<tr>\
								<td><div class='slxMathJax'>\\(\\rm{pH=-\\log([H_3O^+])}\\)</div></td>\
							</tr>\
							<tr>\
								<td><div class='slxMathJax'>\\(\\rm{pOH=-\\log([OH^-])}\\)</div></td>\
							</tr>\
						</tbody>\
					</table>\
				</div>"
			]
		},
		
		Acids: {
			name: "Acids",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'>\
					<table id='panel' class='panel1'>\
						<tr>\
							<th id='panelHeader-{ID}'>{NAME}</th>\
						</tr>\
					</table>\
				</div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'>\
					<table id='panel' class='panel1'>\
						<tbody class='tr-border'>\
							<tr>\
								<th id='panelHeader-{ID}'>{NAME}</th>\
							</tr>\
							<tr>\
								<td><div class='slxMathJax'>\\(\\rm{AH \\longrightarrow A^- + H^+}\\)</div></td>\
							</tr>\
							<tr>\
								<td><div class='slxMathJax'>\\(\\rm{\\textit{K}_a=\\frac{\\displaystyle [A^-][H^+]}{\\displaystyle [AH]}}\\)</div></td>\
							</tr>\
							<tr>\
								<td><div class='slxMathJax'>\\(\\rm{p\\textit{K}_a=-\\log(\\textit{K}_a)=pH-\\log\\left(\\frac{\\displaystyle [A^-]}{\\displaystyle [AH]}\\right)}\\)</div></td>\
							</tr>\
						</tbody\
					</table>\
				</div>"
			]
		},			

		ConvertUnits: {
			name: "ConvertUnits",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'>\
					<table id='panel-ConvertUnits' class='panel1 convertUnits'>\
						<tr>\
							<th id='panelHeader-{ID}' class='button ConvertUnits'>Convert Units</th>\
						</tr>\
					</table>\
				</div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'>\
					<table id='panel-ConvertUnits' class='panel1 convertUnits'>\
						<tr>\
							<th id='panelHeader-{ID}' class='button ConvertUnits'>Convert Units</th>\
						</tr>\
						<tr>\
							<td><input id='ConvertUnits' type='text' value='1 m to ft'></td>\
						</tr>\
						<tr>\
							<td id='convertUnits-result'></td>\
						</tr>\
					</table>\
				</div>"
			]
		},

		SiDimensionSymbols: {
			name: "SiDimensionSymbols", 
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-SiDimensionSymbols' class='panel siDimensionSymbols'>\
					<tr>\
						<th id='panelHeader-{ID}' colspan='3' class='button SiDimensionSymbols'>SI Dimension Symbols</th>\
					</tr>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-SiDimensionSymbols' class='panel siDimensionSymbols'>\
					<tr>\
						<th id='panelHeader-{ID}' colspan='3' class='button SiDimensionSymbols'>SI Dimension Symbols</th>\
					</tr>\
					<tr>\
						<td>L</td>\
						<td>length</td>\
						<td>m</td>\
					</tr>\
					<tr>\
						<td>M</td>\
						<td>mass</td>\
						<td>kg</td>\
					</tr>\
					<tr>\
						<td>T</td>\
						<td>time</td>\
						<td>s</td>\
					</tr>\
					<tr>\
						<td>I</td>\
						<td title='electric current'>current</td>\
						<td>A</td>\
					</tr>\
					<tr>\
						<td>Θ</td>\
						<td title='thermodynamic temperature'>temperature</td>\
						<td>K</td>\
					</tr>\
					<tr>\
						<td>N</td>\
						<td title='quantity of particles of a substance'>quantity</td>\
						<td>mol</td>\
					</tr>\
					<tr>\
						<td>J</td>\
						<td>luminous intensity</td>\
						<td title='candela'>cd</td>\
					</tr>\
				</table></div>"
			]
		},

		Magnitude: {
			name: "Magnitude",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Magnitude' class='panel magnitude'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Magnitude' colspan='7' >Magnitude</th>\
					</tr>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Magnitude' class='panel magnitude'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Magnitude' colspan='7' >Magnitude</th>\
					</tr>\
					<tr>\
						<td>symbol</td>\
						<td>prefix</td>\
						<td title='power of ten'>power</td>\
						<td title='order of magnitude'>order</td>\
						<td colspan='2'>decimal</td>\
						<td>word</td>\
					</tr>\
					<tr>\
						<td>Y</td>\
						<td>yotta</td>\
						<td>10<sup>24</sup></td>\
						<td>24</td>\
						<td>1 000 000 000 000 000 000 000 000</td>\
						<td></td>\
						<td>septillion</td>\
					</tr>\
					<tr>\
						<td>Z</td>\
						<td>zetta</td>\
						<td>10<sup>21</sup></td>\
						<td>21</td>\
						<td>1 000 000 000 000 000 000 000</td>\
						<td></td>\
						<td>sextillion</td>\
					</tr>\
					<tr>\
						<td>E</td>\
						<td>exa</td>\
						<td>10<sup>18</sup></td>\
						<td>18</td>\
						<td>1 000 000 000 000 000 000</td>\
						<td></td>\
						<td>quintillion</td>\
					</tr>\
					<tr>\
						<td>P</td>\
						<td>peta</td>\
						<td>10<sup>15</sup></td>\
						<td>15</td>\
						<td>1 000 000 000 000 000</td>\
						<td></td>\
						<td>quadrillion</td>\
					</tr>\
					<tr>\
						<td>T</td>\
						<td>tera</td>\
						<td>10<sup>12</sup></td>\
						<td>12</td>\
						<td>1 000 000 000 000</td>\
						<td></td>\
						<td>trillion</td>\
					</tr>\
					<tr>\
						<td>G</td>\
						<td>giga</td>\
						<td>10<sup>9</sup></td>\
						<td>9</td>\
						<td>1 000 000 000</td>\
						<td></td>\
						<td>billion</td>\
					</tr>\
					<tr>\
						<td>M</td>\
						<td>mega</td>\
						<td>10<sup>6</sup></td>\
						<td>6</td>\
						<td>1 000 000</td>\
						<td></td>\
						<td>million</td>\
					</tr>\
					<tr>\
						<td>k</td>\
						<td>kilo</td>\
						<td>10<sup>3</sup></td>\
						<td>3</td>\
						<td>1 000</td>\
						<td></td>\
						<td>thousand</td>\
					</tr>\
					<tr>\
						<td>h</td>\
						<td>hecto</td>\
						<td>10<sup>2</sup></td>\
						<td>2</td>\
						<td>100</td>\
						<td></td>\
						<td>hundred</td>\
					</tr>\
					<tr>\
						<td>da</td>\
						<td>deca</td>\
						<td>10<sup>1</sup></td>\
						<td>1</td>\
						<td>10</td>\
						<td></td>\
						<td>ten</td>\
					</tr>\
					<tr>\
						<td>-</td>\
						<td class='c'>-</td>\
						<td>10<sup>0</sup></td>\
						<td>0</td>\
						<td>1</td>\
						<td></td>\
						<td>one</td>\
					</tr>\
					<tr>\
						<td>d</td>\
						<td>deci</td>\
						<td>10<sup>-1</sup></td>\
						<td>-1</td>\
						<td>0</td>\
						<td>.1</td>\
						<td>tenth</td>\
					</tr>\
					<tr>\
						<td>c</td>\
						<td>centi</td>\
						<td>10<sup>-2</sup></td>\
						<td>-2</td>\
						<td>0</td>\
						<td>.01</td>\
						<td>hundredth</td>\
					</tr>\
					<tr>\
						<td>m</td>\
						<td>milli</td>\
						<td>10<sup>-3</sup></td>\
						<td>-3</td>\
						<td>0</td>\
						<td>.001</td>\
						<td>thousandth</td>\
					</tr>\
					<tr>\
						<td>µ</td>\
						<td>micro</td>\
						<td>10<sup>-6</sup></td>\
						<td>-6</td>\
						<td>0</td>\
						<td>.000 001</td>\
						<td>millionth</td>\
					</tr>\
					<tr>\
						<td>n</td>\
						<td>nano</td>\
						<td>10<sup>-9</sup></td>\
						<td>-9</td>\
						<td>0</td>\
						<td>.000 000 001</td>\
						<td>billionth</td>\
					</tr>\
					<tr>\
						<td>p</td>\
						<td>pico</td>\
						<td>10<sup>-12</sup></td>\
						<td>-12</td>\
						<td>0</td>\
						<td>.000 000 000 001</td>\
						<td>trillionth</td>\
					</tr>\
					<tr>\
						<td>f</td>\
						<td>femto</td>\
						<td>10<sup>-15</sup></td>\
						<td>-15</td>\
						<td>0</td>\
						<td>.000 000 000 000 001</td>\
						<td>quadrillionth</td>\
					</tr>\
					<tr>\
						<td>a</td>\
						<td>atto</td>\
						<td>10<sup>-18</sup></td>\
						<td>-18</td>\
						<td>0</td>\
						<td>.000 000 000 000 000 001</td>\
						<td>quintillionth</td>\
					</tr>\
					<tr>\
						<td>z</td>\
						<td>zepto</td>\
						<td>10<sup>-21</sup></td>\
						<td>-21</td>\
						<td>0</td>\
						<td>.000 000 000 000 000 000 001</td>\
						<td>sextillionth</td>\
					</tr>\
					<tr>\
						<td>y</td>\
						<td>yocto</td>\
						<td>10<sup>-24</sup></td>\
						<td>-24</td>\
						<td>0</td>\
						<td>.000 000 000 000 000 000 000 001</td>\
						<td>septillionth</td>\
					</tr>\
				</table></div>"
			]
		},

		TimeSymbols: {
			name: "TimeSymbols",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-TimeSymbols' class='panel timeSymbols'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button TimeSymbols' colspan='2'>Time Symbols</th>\
					</tr>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-TimeSymbols' class='panel timeSymbols'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button TimeSymbols' colspan='2'>Time Symbols</th>\
					</tr>\
					<tr>\
						<td title='sec'>s</td>\
						<td>second</td>\
					</tr>\
					<tr>\
						<td>min</td>\
						<td>minute</td>\
					</tr>\
					<tr>\
						<td>hr</td>\
						<td>hour</td>\
					</tr>\
					<tr>\
						<td>d</td>\
						<td>day</td>\
					</tr>\
					<tr>\
						<td>wk</td>\
						<td>week</td>\
					</tr>\
					<tr>\
						<td>-</td>\
						<td>fortnight</td>\
					</tr>\
					<tr>\
						<td>mon</td>\
						<td>month</td>\
					</tr>\
					<tr>\
						<td>yr</td>\
						<td>year</td>\
					</tr>\
					<tr>\
						<td>-</td>\
						<td>decade</td>\
					</tr>\
					<tr>\
						<td>-</td>\
						<td>century</td>\
					</tr>\
					<tr>\
						<td>-</td>\
						<td>millennium</td>\
					</tr>\
					<tr>\
						<td>ya</td>\
						<td>years ago</td>\
					</tr>\
					<tr>\
						<td>kya</td>\
						<td>thousand years ago</td>\
					</tr>\
					<tr>\
						<td>mya</td>\
						<td>million years ago</td>\
					</tr>\
					<tr>\
						<td>bya</td>\
						<td>billion years ago</td>\
					</tr>\
					<tr>\
						<td>tya</td>\
						<td>trillion years ago</td>\
					</tr>\
				</table></div>"
			]
		},

		Length: {
			name: "Length",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Length' class='panel length'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Length' colspan='5'>Length</th>\
					</tr>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel-{ID}'><table id='panel-Length' class='panel length'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Length' colspan='5'>Length</th>\
					</tr>\
					<tr>\
						<td colspan='5'>SI</td>\
					</tr>\
					<tr>\
						<td>1</td>\
						<td title='Ångström'>Å</td>\
						<td>=</td>\
						<td>10<sup>-10</sup></td>\
						<td>m</td>\
					</tr>\
					<tr>\
						<td colspan='5'>English</td>\
					</tr>\
					<tr>\
						<td>1</td>\
						<td>m</td>\
						<td>=</td>\
						<td title='3.280 84'>3.281</td>\
						<td>ft</td>\
					</tr>\
					<tr>\
						<td>1</td>\
						<td title='foot'>ft</td>\
						<td></td>\
						<td>12</td>\
						<td title='inch'>in</td>\
					</tr>\
					<tr>\
						<td>1</td>\
						<td title='yard'>yd</td>\
						<td></td>\
						<td>3</td>\
						<td title='foot'>ft</td>\
					</tr>\
					<tr>\
						<td>1</td>\
						<td title='mile'>mi</td>\
						<td></td>\
						<td>5280</td>\
						<td title='foot'>ft</td>\
					</tr>\
				</table></div>"
			]
		},

		Temperature: {
			name:"Temperature",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Temperature' class='panel temperature'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Temperature' colspan='5'>Temperature</th>\
					</tr>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Temperature' class='panel temperature'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Temperature' colspan='5'>Temperature</th>\
					</tr>\
					<tr>\
						<td>0</td>\
						<td>°C</td>\
						<td>=</td>\
						<td>273.15</td>\
						<td>K</td>\
					</tr>\
					<tr>\
						<td>0</td>\
						<td>°F</td>\
						<td>=</td>\
						<td>459.67</td>\
						<td title='rankine'>°R</td>\
					</tr>\
					<tr>\
						<td colspan='5'><div class='slxMathJax'>\\(\\rm{T_{^\\circ F}=T_{^\\circ C}\\times\\frac{9}{5}+32}\\)<div></td>\
					</tr>\
				</table></div>"
			]
		},

		Mass: {
			name: "Mass",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Mass' class='panel mass'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Mass' colspan='5'>Mass</th>\
					</tr>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Mass' class='panel mass'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Mass' colspan='5'>Mass</th>\
					</tr>\
					<tr>\
						<td></td>\
						<td title='gm'>g</td>\
						<td></td>\
						<td colspan='2'>gram</td>\
					</tr>\
					<tr>\
						<td colspan='5'>English</td>\
					<tr>\
					<tr>\
						<td>1</td>\
						<td>kg</td>\
						<td>=</td>\
						<td>2.205</td>\
						<td title='pounds'>lb</td>\
					</tr>\
					</tr>\
						<td>1</td>\
						<td>lb</td>\
						<td></td>\
						<td>16</td>\
						<td title='ounces'>oz</td>\
					</tr>\
				</table></div>"
			]
		},

		Volume: {
			name: "Volume",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Volume' class='panel volume'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Volume' colspan='5'>Volume</th>\
					</tr>\
				</table"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Volume' class='panel volume'>\
					<tr>\
						<th id='panelHeader-{ID}' class='button Volume' colspan='5'>Volume</th>\
					</tr>\
					<tr>\
						<td></td>\
						<td title='L'>ℓ</td>\
						<td></td>\
						<td colspan='2'>liter</td>\
					</tr>\
					<tr>\
						<td>1</td>\
						<td>ℓ</td>\
						<td>=</td>\
						<td>1000</td>\
						<td>cm<sup>3</sup></td>\
					</tr>\
					<tr>\
						<td colspan='5'>English</td>\
					</tr>\
					<tr>\
						<td>1</td>\
						<td title='gallon'>gal</td>\
						<td>=</td>\
						<td>3.7854</td>\
						<td><i>l</i></td>\
					</tr>\
				</table></div>"
			]
		},

		TwosComplimentHexadecimal: {
			name: "TwosComplimentHexadecimal",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-TwosComplimentHexadecimal' class='panel text-align-center border-collapse'>\
					<colgroup>\
						<col span='7' class='border'>\
					</colgroup>\
					<tbody>\
						<tr class='border'>\
							<th id='panelHeader-{ID}' colspan='7'>2's Compliment (Hexadecimal)</th>\
						</tr>\
					</tbody>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-TwosComplimentHexadecimal' class='panel text-align-center border-collapse'>\
					<colgroup>\
						<col span='7' class='border'>\
					</colgroup>\
					<tbody>\
						<tr class='border'>\
							<th id='panelHeader-{ID}' colspan='7'>2's Compliment (Hexadecimal)</th>\
						</tr>\
						<tr class='border'>\
							<th>bin</th>\
							<th>hex</th>\
							<th colspan='3'>dec</th>\
							<th>hex</th>\
							<th>bin</th>\
						</tr>\
						<tr class='border'>\
							<td>1111</td>\
							<td>F</td>\
							<td>15</td>\
							<td>-1</td>\
							<td>0</td>\
							<td>0</td>\
							<td>0000</td>\
						</tr>\
						<tr class='border'>\
							<td>1110</td>\
							<td>E</td>\
							<td>14</td>\
							<td>-2</td>\
							<td>1</td>\
							<td>1</td>\
							<td>0001</td>\
						</tr>\
						<tr class='border'>\
							<td>1101</td>\
							<td>D</td>\
							<td>13</td>\
							<td>-3</td>\
							<td>2</td>\
							<td>2</td>\
							<td>0010</td>\
						</tr>\
						<tr class='border'>\
							<td>1100</td>\
							<td>C</td>\
							<td>12</td>\
							<td>-4</td>\
							<td>3</td>\
							<td>3</td>\
							<td>0011</td>\
						</tr>\
						<tr class='border'>\
							<td>1011</td>\
							<td>B</td>\
							<td>11</td>\
							<td>-5</td>\
							<td>4</td>\
							<td>4</td>\
							<td>0100</td>\
						</tr>\
						<tr class='border'>\
							<td>1010</td>\
							<td>A</td>\
							<td>10</td>\
							<td>-6</td>\
							<td>5</td>\
							<td>5</td>\
							<td>0101</td>\
						</tr>\
						<tr class='border'>\
							<td>1001</td>\
							<td>9</td>\
							<td>9</td>\
							<td>-7</td>\
							<td>6</td>\
							<td>6</td>\
							<td>0110</td>\
						</tr>\
						<tr class='border'>\
							<td>1000</td>\
							<td>8</td>\
							<td>8</td>\
							<td>-8</td>\
							<td>7</td>\
							<td>7</td>\
							<td>0111</td>\
						</tr>\
					</tbody>\
				</table></div>"
			]
		},

		MultiplesOf16: {
			name: "MultiplesOf16",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-MultiplesOf16' class='panel text-align-center border-collapse'>\
					<colgroup>\
					</colgroup>\
					<tbody>\
						<tr class='border'>\
							<th id='panelHeader-{ID}' colspan='5'>Multiples of 16</th>\
						</tr>\
					</tbody>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-MultiplesOf16' class='panel text-align-center border-collapse'>\
					<colgroup>\
					</colgroup>\
					<tbody>\
						<tr class='border'>\
							<th id='panelHeader-{ID}' colspan='5'>Multiples of 16</th>\
						</tr>\
						<tr class='border'>\
							<td>1</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>16</td>\
						</tr>\
						<tr class='border'>\
							<td>2</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>32</td>\
						</tr>\
						<tr class='border'>\
							<td>3</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>48</td>\
						</tr>\
						<tr class='border'>\
							<td>4</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>64</td>\
						</tr>\
						<tr class='border'>\
							<td>5</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>80</td>\
						</tr>\
						<tr class='border'>\
							<td>6</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>96</td>\
						</tr>\
						<tr class='border'>\
							<td>7</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>112</td>\
						</tr>\
						<tr class='border'>\
							<td>8</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>128</td>\
						</tr>\
						<tr class='border'>\
							<td>9</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>144</td>\
						</tr>\
						<tr class='border'>\
							<td>10</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>160</td>\
						</tr>\
						<tr class='border'>\
							<td>11</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>176</td>\
						</tr>\
						<tr class='border'>\
							<td>12</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>192</td>\
						</tr>\
						<tr class='border'>\
							<td>13</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>208</td>\
						</tr>\
						<tr class='border'>\
							<td>14</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>224</td>\
						</tr>\
						<tr class='border'>\
							<td>15</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>240</td>\
						</tr>\
						<tr class='border'>\
							<td>16</td>\
							<td>x</td>\
							<td>16</td>\
							<td>=</td>\
							<td>256</td>\
						</tr>\
					</tbody>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-MultiplesOf16' class='panel text-align-center border-collapse'>\
					<colgroup>\
					</colgroup>\
					<tbody class='td-border td-text-align-right'>\
						<tr class='border'>\
							<th id='panelHeader-{ID}' colspan='5'>Multiples of 16</th>\
						</tr>\
						<tr>\
							<td>16</td>\
							<td>32</td>\
							<td>48</td>\
							<td>64</td>\
						</tr>\
						<tr>\
							<td>80</td>\
							<td>96</td>\
							<td>112</td>\
							<td>128</td>\
						</tr>\
						<tr>\
							<td>144</td>\
							<td>160</td>\
							<td>176</td>\
							<td>192</td>\
						</tr>\
						<tr>\
							<td>208</td>\
							<td>224</td>\
							<td>240</td>\
							<td>256</td>\
						</tr>\
					</tbody>\
				</table></div>"
			]
		},

		PowersOf2: {
			name: "PowersOf2",
			displays: [	
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-PowersOf2' class='panel border-collapse'>\
					<colgroup>\
					</colgroup>\
					<tbody class='tr-border td-text-align-right'>\
						<tr>\
							<th id='panelHeader-{ID}' colspan='3' class='text-align-center'>Powers of 2</th>\
						</tr>\
					</tbody>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-PowersOf2' class='panel border-collapse'>\
					<colgroup>\
					</colgroup>\
					<tbody class='tr-border td-text-align-right'>\
						<tr>\
							<th id='panelHeader-{ID}' colspan='3' class='text-align-center'>Powers of 2</th>\
						</tr>\
						<tr>\
							<td>2<sup>0</sup></td>\
							<td>=</td>\
							<td>1</td>\
						</tr>\
						<tr>\
							<td>2<sup>1</sup></td>\
							<td>=</td>\
							<td>2</td>\
						</tr>\
						<tr>\
							<td>2<sup>2</sup></td>\
							<td>=</td>\
							<td>4</td>\
						</tr>\
						<tr>\
							<td>2<sup>3</sup></td>\
							<td>=</td>\
							<td>8</td>\
						</tr>\
						<tr>\
							<td>2<sup>4</sup></td>\
							<td>=</td>\
							<td>16</td>\
						</tr>\
						<tr>\
							<td>2<sup>5</sup></td>\
							<td>=</td>\
							<td>32</td>\
						</tr>\
						<tr>\
							<td>2<sup>6</sup></td>\
							<td>=</td>\
							<td>64</td>\
						</tr>\
						<tr>\
							<td>2<sup>7</sup></td>\
							<td>=</td>\
							<td>128</td>\
						</tr>\
						<tr>\
							<td>2<sup>8</sup></td>\
							<td>=</td>\
							<td>256</td>\
						</tr>\
						<tr>\
							<td>2<sup>9</sup></td>\
							<td>=</td>\
							<td>512</td>\
						</tr>\
						<tr>\
							<td>2<sup>10</sup></td>\
							<td>=</td>\
							<td>1024</td>\
						</tr>\
						<tr>\
							<td>2<sup>11</sup></td>\
							<td>=</td>\
							<td>2048</td>\
						</tr>\
					</tbody>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-PowersOf2' class='panel border-collapse'>\
					<colgroup>\
					</colgroup>\
					<tbody class='td-border td-text-align-right'>\
						<tr>\
							<th id='panelHeader-{ID}' colspan='4' class='text-align-center'>Powers of 2</th>\
						</tr>\
						<tr>\
							<td>1</td>\
							<td>2</td>\
							<td>4</td>\
							\
						</tr>\
						<tr>\
							<td>8</td>\
							<td>16</td>\
							<td>32</td>\
						</tr>\
						<tr>\
							<td>64</td>\
							<td>128</td>\
							<td>256</td>\
						</tr>\
						<tr>\
							<td>512</td>\
							<td>1024</td>\
							<td>2048</td>\
						</tr>\
					</tbody>\
				</table></div>"
			]
		},

		Overflow: {
			name: "Overflow",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Overflow' class='panel text-align-center border-collapse'>\
					<colgroup>\
					</colgroup>\
					<tbody>\
						<tr class='border'>\
							<th id='panelHeader-{ID}' colspan='5'>Overflow</th>\
						</tr>\
					</tbody>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-Overflow' class='panel text-align-center border-collapse'>\
					<colgroup>\
					</colgroup>\
					<tbody>\
						<tr class='border'>\
							<th id='panelHeader-{ID}' colspan='5'>Overflow</th>\
						</tr>\
						<tr>\
							<th colspan='5' class='border'>Possible</th>\
						</tr>\
						<tr class='border'>\
							<td>(+)</td>\
							<td>+</td>\
							<td>(+)</td>\
							<td>=</td>\
							<td>(+)</td>\
						</tr>\
						<tr class='border'>\
							<td>(-)</td>\
							<td>+</td>\
							<td>(-)</td>\
							<td>=</td>\
							<td>(-)</td>\
						</tr>\
						<tr class='border'>\
							<td>(-)</td>\
							<td>-</td>\
							<td>(+)</td>\
							<td>=</td>\
							<td>(-)</td>\
						</tr>\
						<tr class='border'>\
							<td>(+)</td>\
							<td>-</td>\
							<td>(-)</td>\
							<td>=</td>\
							<td>(+)</td>\
						</tr>\
						<tr>\
							<th colspan='5' class='border'>Impossible</th>\
						</tr>\
						<tr class='border'>\
							<td>(+)</td>\
							<td>-</td>\
							<td>(+)</td>\
							<td>=</td>\
							<td>(+/-)</td>\
						</tr>\
						<tr class='border'>\
							<td>(-)</td>\
							<td>-</td>\
							<td>(-)</td>\
							<td>=</td>\
							<td>(+/-)</td>\
						</tr>\
						<tr class='border'>\
							<td>(-)</td>\
							<td>+</td>\
							<td>(+)</td>\
							<td>=</td>\
							<td>(+/-)</td>\
						</tr>\
						<tr class='border'>\
							<td>(+)</td>\
							<td>+</td>\
							<td>(-)</td>\
							<td>=</td>\
							<td>(+/-)</td>\
						</tr>\
					</tbody>\
				</table></div>"
			]
		},

		UnitConversionsBits: {
			name: "UnitConversionsBits",
			displays: [
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-UnitConversionsBits' class='panel border-collapse'>\
					<tbody>\
						<tr class='border'>\
							<th id='panelHeader-{ID}' colspan='8'>Unit Conversions</th>\
						</tr>\
					</tbody>\
				</table></div>"
				,
				"<div id='div-panel-{ID}' class='div-panel'><table id='panel-UnitConversionsBits' class='panel border-collapse'>\
					<tbody>\
						<tr class='border'>\
							<th id='panelHeader-{ID}' colspan='8'>Unit Conversions</th>\
						</tr>\
						<tr class='border'>\
							<td class='text-align-right'>1</td>\
							<td>nibble</td>\
							<td>=</td>\
							<td class='text-align-right'>1</td>\
							<td>hex digit</td>\
							<td>=</td>\
							<td class='text-align-right'>4</td>\
							<td>bits</td>\
						</tr>\
						<tr class='border'>\
							<td class='text-align-right'>1</td>\
							<td>byte</td>\
							<td>=</td>\
							<td class='text-align-right'>2</td>\
							<td>nibbles</td>\
							<td>=</td>\
							<td class='text-align-right'>8</td>\
							<td>bits</td>\
						</tr>\
						<tr class='border'>\
							<td class='text-align-right'>1</td>\
							<td>word</td>\
							<td>=</td>\
							<td class='text-align-right'>2</td>\
							<td>bytes</td>\
							<td>=</td>\
							<td class='text-align-right'>16</td>\
							<td>bits</td>\
						</tr>\
						<tr class='border'>\
							<td class='text-align-right'>1</td>\
							<td>long word</td>\
							<td>=</td>\
							<td class='text-align-right'>2</td>\
							<td>words</td>\
							<td>=</td>\
							<td class='text-align-right'>32</td>\
							<td>bits</td>\
						</tr>\
					</tbody>\
				</table></div>"
			]
		}
			
	} // End Panels
} // End Data