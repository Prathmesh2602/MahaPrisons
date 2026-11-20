# -*- coding: utf-8 -*-
"""
Script to generate the comprehensive MahaPrisons UAT Testing Guide in docx format.
"""
import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_margins(cell, top=120, bottom=120, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m_name, m_val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m_name}')
        node.set(qn('w:w'), str(m_val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_shading(cell, color_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    tcPr.append(shd)

def set_cell_border(cell, **kwargs):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement('w:tcBorders')
    for edge in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'):
        edge_data = kwargs.get(edge)
        if edge_data:
            tag = f'w:{edge}'
            element = OxmlElement(tag)
            element.set(qn('w:val'), edge_data.get('val', 'single'))
            element.set(qn('w:sz'), str(edge_data.get('sz', 4)))
            element.set(qn('w:space'), '0')
            element.set(qn('w:color'), edge_data.get('color', 'CBD5E1'))
            tcBorders.append(element)
    tcPr.append(tcBorders)

def style_table(table, col_widths=None, header_bg='0F172A', zebra=True):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    # Header Row
    for cell in table.rows[0].cells:
        set_cell_shading(cell, header_bg)
        set_cell_margins(cell, top=140, bottom=140, left=160, right=160)
        set_cell_border(cell, 
                        top={'sz': 6, 'val': 'single', 'color': '0F172A'},
                        bottom={'sz': 12, 'val': 'single', 'color': '0F172A'},
                        left={'sz': 4, 'val': 'single', 'color': '334155'},
                        right={'sz': 4, 'val': 'single', 'color': '334155'})
        for p in cell.paragraphs:
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            for r in p.runs:
                r.font.bold = True
                r.font.color.rgb = RGBColor(255, 255, 255)
                r.font.name = 'Segoe UI'
                r.font.size = Pt(9.5)

    # Data Rows
    for row_idx, row in enumerate(table.rows[1:], start=1):
        bg = 'F8FAFC' if (zebra and row_idx % 2 == 1) else 'FFFFFF'
        for cell in row.cells:
            set_cell_shading(cell, bg)
            set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
            set_cell_border(cell,
                            top={'sz': 4, 'val': 'single', 'color': 'E2E8F0'},
                            bottom={'sz': 4, 'val': 'single', 'color': 'E2E8F0'},
                            left={'sz': 4, 'val': 'single', 'color': 'E2E8F0'},
                            right={'sz': 4, 'val': 'single', 'color': 'E2E8F0'})
            for p in cell.paragraphs:
                p.paragraph_format.space_before = Pt(2)
                p.paragraph_format.space_after = Pt(2)
                for r in p.runs:
                    r.font.name = 'Segoe UI'
                    r.font.size = Pt(9)
                    if not r.font.color.rgb:
                        r.font.color.rgb = RGBColor(30, 41, 59)

    # Column Widths
    if col_widths:
        for row in table.rows:
            for i, w in enumerate(col_widths):
                if i < len(row.cells):
                    row.cells[i].width = Inches(w)

def add_callout(doc, callout_type, text_content):
    colors = {
        'CAUTION': {'border': 'D97706', 'bg': 'FFFBEB', 'icon': '⚠️ CAUTION:', 'text_color': '92400E'},
        'TIP': {'border': '059669', 'bg': 'ECFDF5', 'icon': '💡 TIP:', 'text_color': '065F46'},
        'IMPORTANT': {'border': '4F46E5', 'bg': 'EEF2FF', 'icon': '📌 IMPORTANT:', 'text_color': '3730A3'},
        'NOTE': {'border': '475569', 'bg': 'F1F5F9', 'icon': 'ℹ️ NOTE:', 'text_color': '1E293B'},
        'STATUS': {'border': 'DC2626', 'bg': 'FEF2F2', 'icon': '🚫 STATUS: NOT AVAILABLE IN THIS BUILD', 'text_color': '991B1B'}
    }
    cfg = colors.get(callout_type, colors['NOTE'])
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    cell.width = Inches(6.8)
    set_cell_shading(cell, cfg['bg'])
    set_cell_margins(cell, top=130, bottom=130, left=180, right=180)
    set_cell_border(cell,
                    left={'sz': 24, 'val': 'single', 'color': cfg['border']},
                    top={'sz': 4, 'val': 'single', 'color': 'E2E8F0'},
                    right={'sz': 4, 'val': 'single', 'color': 'E2E8F0'},
                    bottom={'sz': 4, 'val': 'single', 'color': 'E2E8F0'})
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    
    r_hdr = p.add_run(f"{cfg['icon']} ")
    r_hdr.font.bold = True
    r_hdr.font.name = 'Segoe UI'
    r_hdr.font.size = Pt(9.5)
    r_hdr.font.color.rgb = RGBColor.from_string(cfg['border'])
    
    r_txt = p.add_run(text_content)
    r_txt.font.name = 'Segoe UI'
    r_txt.font.size = Pt(9.5)
    r_txt.font.color.rgb = RGBColor.from_string(cfg['text_color'])
    
    p_spacer = doc.add_paragraph()
    p_spacer.paragraph_format.space_before = Pt(0)
    p_spacer.paragraph_format.space_after = Pt(4)

def add_heading_1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(20)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Segoe UI'
    run.font.size = Pt(15)
    run.font.bold = True
    run.font.color.rgb = RGBColor(15, 23, 42)
    return p

def add_heading_2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Segoe UI'
    run.font.size = Pt(12.5)
    run.font.bold = True
    run.font.color.rgb = RGBColor(30, 41, 59)
    return p

def add_heading_3(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Segoe UI'
    run.font.size = Pt(10.5)
    run.font.bold = True
    run.font.color.rgb = RGBColor(51, 65, 85)
    return p

def add_body_p(doc, text, bold_prefix=None, space_after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Segoe UI'
        r_pre.font.size = Pt(9.5)
        r_pre.font.bold = True
        r_pre.font.color.rgb = RGBColor(15, 23, 42)
    r_txt = p.add_run(text)
    r_txt.font.name = 'Segoe UI'
    r_txt.font.size = Pt(9.5)
    r_txt.font.color.rgb = RGBColor(51, 65, 85)
    return p

def add_bullet(doc, text, bold_prefix=None):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = 'Segoe UI'
        r_pre.font.size = Pt(9.5)
        r_pre.font.bold = True
        r_pre.font.color.rgb = RGBColor(15, 23, 42)
    r_txt = p.add_run(text)
    r_txt.font.name = 'Segoe UI'
    r_txt.font.size = Pt(9.5)
    r_txt.font.color.rgb = RGBColor(51, 65, 85)
    return p

def add_metadata_table(doc, performed_by, where_path, complete_first):
    tbl = doc.add_table(rows=3, cols=2)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    data = [
        ("Performed by", performed_by),
        ("Where in the portal", where_path),
        ("Complete these first", complete_first)
    ]
    for i, (k, v) in enumerate(data):
        c0 = tbl.cell(i, 0)
        c1 = tbl.cell(i, 1)
        c0.width = Inches(2.0)
        c1.width = Inches(4.8)
        set_cell_shading(c0, 'F1F5F9')
        set_cell_shading(c1, 'FFFFFF')
        set_cell_margins(c0, top=70, bottom=70, left=120, right=120)
        set_cell_margins(c1, top=70, bottom=70, left=120, right=120)
        set_cell_border(c0, top={'sz': 4, 'val': 'single', 'color': 'CBD5E1'},
                            bottom={'sz': 4, 'val': 'single', 'color': 'CBD5E1'},
                            left={'sz': 4, 'val': 'single', 'color': 'CBD5E1'},
                            right={'sz': 4, 'val': 'single', 'color': 'CBD5E1'})
        set_cell_border(c1, top={'sz': 4, 'val': 'single', 'color': 'CBD5E1'},
                            bottom={'sz': 4, 'val': 'single', 'color': 'CBD5E1'},
                            left={'sz': 4, 'val': 'single', 'color': 'CBD5E1'},
                            right={'sz': 4, 'val': 'single', 'color': 'CBD5E1'})
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_before = Pt(1)
        p0.paragraph_format.space_after = Pt(1)
        r0 = p0.add_run(k)
        r0.font.bold = True
        r0.font.name = 'Segoe UI'
        r0.font.size = Pt(9)
        r0.font.color.rgb = RGBColor(15, 23, 42)

        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_before = Pt(1)
        p1.paragraph_format.space_after = Pt(1)
        r1 = p1.add_run(v)
        r1.font.name = 'Segoe UI'
        r1.font.size = Pt(9)
        r1.font.color.rgb = RGBColor(30, 41, 59)
    
    p_spacer = doc.add_paragraph()
    p_spacer.paragraph_format.space_before = Pt(0)
    p_spacer.paragraph_format.space_after = Pt(4)

print("Writing generator script core...")

