import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

doc = docx.Document()
p = doc.add_paragraph()
r = p.add_run("Test Document")
r.font.size = Pt(20)
r.font.bold = True
r.font.color.rgb = RGBColor(15, 23, 42)

table = doc.add_table(rows=2, cols=2)
table.style = 'Table Grid'
doc.save('scratch/test.docx')
print('Docx created successfully!')

