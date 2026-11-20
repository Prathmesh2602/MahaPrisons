# -*- coding: utf-8 -*-
import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

from uat_script_core import (
    set_cell_margins, set_cell_shading, set_cell_border, style_table,
    add_callout, add_heading_1, add_heading_2, add_heading_3,
    add_body_p, add_bullet, add_metadata_table
)

def build_document():
    doc = docx.Document()
    
    # Page setup - 0.75 in margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.75)
        section.bottom_margin = Inches(0.75)
        section.left_margin = Inches(0.75)
        section.right_margin = Inches(0.75)
        
        # Header / Footer
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("MahaPrisons CMS Platform — User Acceptance Testing (UAT) Guide v1.0")
        hrun.font.name = "Segoe UI"
        hrun.font.size = Pt(8)
        hrun.font.color.rgb = RGBColor(148, 163, 184)
        
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Confidential — Government of Maharashtra — For Authorized UAT Personnel Only")
        frun.font.name = "Segoe UI"
        frun.font.size = Pt(8)
        frun.font.color.rgb = RGBColor(148, 163, 184)

    # ==========================================
    # TITLE BLOCK
    # ==========================================
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(12)
    p_title.paragraph_format.space_after = Pt(2)
    r_acronym = p_title.add_run("MahaPrisons CMS Platform\n")
    r_acronym.font.name = 'Segoe UI'
    r_acronym.font.size = Pt(24)
    r_acronym.font.bold = True
    r_acronym.font.color.rgb = RGBColor(15, 23, 42) # Slate 900
    
    r_dept = p_title.add_run("Maharashtra Prisons & Correctional Services Department (महाराष्ट्र कारागृह आणि सुधारसेवा विभाग)\n")
    r_dept.font.name = 'Segoe UI'
    r_dept.font.size = Pt(13)
    r_dept.font.color.rgb = RGBColor(71, 85, 105) # Slate 600
    
    r_sub = p_title.add_run("Testing Guide — For user acceptance testing (UAT) of the modules developed so far")
    r_sub.font.name = 'Segoe UI'
    r_sub.font.size = Pt(11)
    r_sub.font.italic = True
    r_sub.font.color.rgb = RGBColor(217, 119, 6) # Amber 600

    p_spacer = doc.add_paragraph()
    p_spacer.paragraph_format.space_before = Pt(4)
    p_spacer.paragraph_format.space_after = Pt(6)

    # Document Details Table
    details_tbl = doc.add_table(rows=5, cols=2)
    details_data = [
        ("Project Version", "2.1.0 (Enterprise CMS & GIGW 3.0 Decoupled Architecture)"),
        ("UAT Document Version", "1.0"),
        ("Date", "November 17, 2026"),
        ("Prepared by", "Principal QA Architect & Technical Writer"),
        ("Intended readers", "Super Admins, Departmental Checkers, Content Makers, QA Test Engineers, Institutional Stakeholders")
    ]
    for i, (k, v) in enumerate(details_data):
        c0 = details_tbl.cell(i, 0)
        c1 = details_tbl.cell(i, 1)
        c0.width = Inches(2.2)
        c1.width = Inches(4.6)
        set_cell_shading(c0, '0F172A' if i == 0 else ('F1F5F9' if i % 2 == 1 else 'FFFFFF'))
        set_cell_shading(c1, '1E293B' if i == 0 else ('F8FAFC' if i % 2 == 1 else 'FFFFFF'))
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
        r0.font.color.rgb = RGBColor(255, 255, 255) if i == 0 else RGBColor(15, 23, 42)

        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_before = Pt(1)
        p1.paragraph_format.space_after = Pt(1)
        r1 = p1.add_run(v)
        r1.font.name = 'Segoe UI'
        r1.font.size = Pt(9)
        r1.font.color.rgb = RGBColor(255, 255, 255) if i == 0 else RGBColor(51, 65, 85)

    p_spacer2 = doc.add_paragraph()
    p_spacer2.paragraph_format.space_before = Pt(6)
    p_spacer2.paragraph_format.space_after = Pt(8)

    # Table of Contents
    add_heading_2(doc, "Table of Contents")
    toc_items = [
        "1. Section 1: About This Guide",
        "    1.1 How to Use This Guide (Core Principles & Data Formats)",
        "    1.2 Roles, Security Tiers, and Credentials Matrix",
        "    1.3 Master Execution Sequence at a Glance",
        "2. Module-by-Module Testing Instructions",
        "    Module 0: Initial Setup, Portal Access & Administrative Authentication",
        "    Module 1: Administrative User Management & Role-Based Access Control (RBAC)",
        "    Module 2: Centralized Media Asset Management & CDN Storage",
        "    Module 3: Global Portal Branding & Institutional Site Settings",
        "    Module 4: Dynamic Navigation & Hierarchical Mega-Menu Management",
        "    Module 5: Fixed Homepage Content & Institutional Showcase Management",
        "    Module 6: Dedicated Prison Facility Profile — Yerwada Open District Prison",
        "    Module 7: Dynamic Page Authoring & Semantic Template Engine (25 Semantic Layouts)",
        "    Module 8: Enterprise Maker-Checker Dual-Authorization Review Workflow",
        "    Module 9: Immutable Audit Trails & Compliance Logging",
        "    Module 10: Citizen Presentation & GIGW 3.0 / WCAG 2.1 AA Accessibility Verification",
        "3. Section 4: Modules Not in This Test Round",
        "4. Annexure A: Comprehensive Progress Checklist & Milestone Sign-Off",
        "5. Annexure B: Test Log Template & Defect Severity Classification Guide"
    ]
    for item in toc_items:
        p_toc = doc.add_paragraph()
        p_toc.paragraph_format.space_before = Pt(1)
        p_toc.paragraph_format.space_after = Pt(1)
        r_toc = p_toc.add_run(item)
        r_toc.font.name = 'Segoe UI'
        r_toc.font.size = Pt(9)
        if item.startswith("    Module") or item.startswith("1.") or item.startswith("2.") or item.startswith("3.") or item.startswith("4.") or item.startswith("5."):
            r_toc.font.bold = True
            r_toc.font.color.rgb = RGBColor(15, 23, 42)
        else:
            r_toc.font.color.rgb = RGBColor(71, 85, 105)

    doc.add_page_break()

    # ==========================================
    # SECTION 1: ABOUT THIS GUIDE
    # ==========================================
    add_heading_1(doc, "1. Section 1: About This Guide")
    add_body_p(doc, 
        "This User Acceptance Testing (UAT) Guide establishes a rigorous, dependency-ordered validation framework for the modernized MahaPrisons Content Management System (CMS) Platform. Designed for the Maharashtra Prisons & Correctional Services Department, the platform modernizes citizen service delivery while enforcing strict maker-checker administrative governance and full GIGW 3.0 / WCAG 2.1 AA compliance.",
        space_after=6
    )

    add_body_p(doc,
        "Crucial Dependency Architecture Rule: In this platform, downstream modules and visual presentation screens strictly rely on upstream master configurations, database entities, media assets, and menu records. Out-of-order data entry will directly cause empty dropdown selectors, broken navigation links, missing image placeholders, and false defect reports. Testers must strictly observe the sequential order defined herein.",
        bold_prefix="The Dependency Rule: ",
        space_after=6
    )

    add_body_p(doc,
        "If a Content Maker navigates to the Header Settings (/settings) or the Hero Carousel Editor (/page-editor?slug=/) and attempts to configure the Department Logo or slider banners before those graphical assets have been uploaded to the centralized Media Library (/api/v1/media), the image selector modal will display zero files, forcing the tester to enter broken manual paths or defectively log an image loading failure.",
        bold_prefix="Concrete Codebase Example 1 (Media Before Content): ",
        space_after=4
    )

    add_body_p(doc,
        "If an administrator configures a new subitem or mega-menu column link in the Navigation Editor (/menu) pointing to /agriculture/mushroom-project or /facilities/smart-card-phone before the corresponding PageNode record has been created or verified in the database, clicking that menu link on the public frontend will hit the dynamic catch-all route (web/src/app/(main)/[...slug]/page.tsx) and trigger the BlankPageFallback screen ('Page Not Found in Database'). The tester might mistakenly log a routing defect, whereas the true cause was violating the data authoring dependency order.",
        bold_prefix="Concrete Codebase Example 2 (Page Nodes Before Menu Links): ",
        space_after=8
    )

    # 1.1 How to use this guide
    add_heading_2(doc, "1.1 How to Use This Guide (Core Principles & Data Formats)")
    add_body_p(doc, "Every tester participating in this UAT round must comply with four foundational operational rules:")

    add_bullet(doc, 
        "Every module in this guide assumes that all preceding modules have been fully executed and verified. Never skip ahead to page editing or review dashboards without completing authentication setup, user provisioning, media uploads, and menu hierarchies.",
        bold_prefix="1. Work strictly top-to-bottom: "
    )
    add_bullet(doc, 
        "Always enter authentic government-style test data adhering to backend validation schemas: 10-digit Indian telephone numbers (e.g., 020-26694051), official government email addresses (e.g., yerwadaop-mh@gov.in), valid image formats (.jpg, .png, .webp, .svg) and PDF documents strictly under 4.5 MB. For bilingual Marathi text fields, use authentic Devanagari script via the built-in Phonetic Input component (typing Roman phonetics like 'karagruh' transforms into 'कारागृह').",
        bold_prefix="2. Use realistic, schema-valid test data: "
    )
    add_bullet(doc, 
        "Log every test step execution in the formal Test Log Table (Annexure B). For every defect observed, capture full-browser screenshots including URL bar and console logs, and record exact input payloads.",
        bold_prefix="3. Record every result and capture visual evidence: "
    )
    add_bullet(doc, 
        "Because multiple QA engineers and departmental evaluators operate against a shared database instance, never permanently delete seeded root menu items, core department layouts, or shared administrative accounts. Instead, toggle the 'Active / Inactive' switch or edit draft content.",
        bold_prefix="4. Do not delete shared baseline data: "
    )

    # 1.2 Roles and logins
    add_heading_2(doc, "1.2 Roles, Security Tiers, and Credentials Matrix")
    add_body_p(doc, "The MahaPrisons platform implements strict Role-Based Access Control (RBAC) with dual-authorization Maker-Checker governance. The roles in the system are configured as follows:")

    roles_tbl = doc.add_table(rows=5, cols=3)
    roles_tbl_data = [
        ("Role", "How the Login is Obtained", "Used For & System Privileges"),
        (
            "Super Admin (SUPER_ADMIN)",
            "Pre-seeded in database: admin@mahaprisons.gov.in / admin123 (or seeded via POST /api/v1/auth/setup)",
            "Full portal authority. Managing administrative users (/users), viewing comprehensive audit logs (/audit-logs), performing direct one-click publishing of site settings, menus, and dynamic pages, and acting as final approver in the review queue (/review)."
        ),
        (
            "Checker Admin (CHECKER)",
            "Pre-seeded in database: checker@mahaprisons.gov.in / admin123 (or created by Super Admin in /users)",
            "Reviewing, inspecting side-by-side diffs, previewing live future state (/preview-revision?revisionId=...), and approving or rejecting proposed changes submitted by Content Makers in the Review Queue (/review). Cannot access /users."
        ),
        (
            "Content Maker (MAKER)",
            "Pre-seeded in database: maker@mahaprisons.gov.in / admin123 (or created by Super Admin in /users)",
            "Authoring content, editing site branding (/settings), modifying mega-menu structures (/menu), and creating/re-styling pages in the split-screen Page Editor (/page-editor). Cannot publish directly; all save operations submit revisions to the Review Queue."
        ),
        (
            "Public Citizen (No login required)",
            "Direct web access to http://localhost:3000 (or production web domain) with zero credentials",
            "Consuming public department information, toggling English/Marathi languages, utilizing GIGW 3.0 accessibility tools (font scaler, high contrast, Bhashini voice synthesizer), downloading gazettes/tenders, and browsing inmate vocational products."
        )
    ]
    for r_idx, row in enumerate(roles_tbl_data):
        for c_idx, val in enumerate(row):
            roles_tbl.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(roles_tbl, col_widths=[1.5, 2.3, 3.0], header_bg='0F172A')

    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(4)
    p_sp.paragraph_format.space_after = Pt(6)

    # 1.3 Sequence at a glance
    add_heading_2(doc, "1.3 Master Execution Sequence at a Glance")
    add_body_p(doc, "The table below establishes the strict chronological testing sequence from initial system setup through final end-to-end verification:")

    seq_tbl = doc.add_table(rows=12, cols=4)
    seq_tbl_data = [
        ("Step", "Module Name", "Primary Role", "Strict Prerequisite (Depends On)"),
        ("Module 0", "Initial Setup, Portal Access & Administrative Authentication", "SUPER_ADMIN, CHECKER, MAKER", "Database Seeding & Backend API Health"),
        ("Module 1", "Administrative User Management & RBAC Governance", "SUPER_ADMIN", "Module 0 (Super Admin Login)"),
        ("Module 2", "Centralized Media Asset Management & CDN Storage", "SUPER_ADMIN, MAKER", "Module 0 (Authenticated Session)"),
        ("Module 3", "Global Portal Branding & Institutional Site Settings", "SUPER_ADMIN, MAKER", "Modules 0, 2 (Uploaded Branding Assets)"),
        ("Module 4", "Dynamic Navigation & Hierarchical Mega-Menu Management", "SUPER_ADMIN, MAKER", "Modules 0, 2, 3 (Branding & Icons)"),
        ("Module 5", "Fixed Homepage Content & Institutional Showcase Management", "SUPER_ADMIN, MAKER", "Modules 0, 2, 3 (Media & Branding)"),
        ("Module 6", "Dedicated Facility Profile — Yerwada Open District Prison", "SUPER_ADMIN, MAKER", "Modules 0, 2, 4 (Media & Menu Routing)"),
        ("Module 7", "Dynamic Page Authoring & Semantic Template Engine (25 Layouts)", "SUPER_ADMIN, MAKER", "Modules 0, 2, 4 (Menu Slugs & Media)"),
        ("Module 8", "Enterprise Maker-Checker Dual-Authorization Review Workflow", "MAKER, CHECKER, SUPER_ADMIN", "Modules 3, 4, 5, 6, 7 (Staged Revisions)"),
        ("Module 9", "Immutable Audit Trails & Compliance Logging", "SUPER_ADMIN, CHECKER, MAKER", "Module 8 (Executed Review Actions)"),
        ("Module 10", "Citizen Presentation & GIGW 3.0 / WCAG 2.1 AA Accessibility", "Public (No Login)", "Modules 3, 4, 5, 6, 7, 8 (Published Live DB)")
    ]
    for r_idx, row in enumerate(seq_tbl_data):
        for c_idx, val in enumerate(row):
            seq_tbl.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(seq_tbl, col_widths=[0.9, 2.5, 1.6, 1.8], header_bg='0F172A')

    doc.add_page_break()

    # ==========================================
    # MODULE-BY-MODULE INSTRUCTIONS
    # ==========================================
    add_heading_1(doc, "2. Module-by-Module Testing Instructions")

    # ----------------------------------------------------
    # MODULE 0: Authentication
    # ----------------------------------------------------
    add_heading_2(doc, "Module 0: Initial Setup, Portal Access & Administrative Authentication")
    add_body_p(doc, 
        "This foundational module verifies administrative access controls, secure JWT token generation, role decoding, and session state persistence. Successful authentication is mandatory before any portal management action can be performed."
    )
    add_metadata_table(doc, 
        "Super Admin, Checker Admin, Content Maker", 
        "Login Portal (/login) & Root Dashboard (/)", 
        "Prisma Database Schema Migration & User Seeding"
    )

    add_heading_3(doc, "0.1 Verify Backend Health and Admin Portal Reachability")
    add_body_p(doc, "1. Open a browser and navigate to the API health endpoint: GET http://localhost:5000/api/health.")
    add_body_p(doc, "2. Verify the JSON response returns status: 'ok', service: 'MahaPrisons API', and a valid ISO-8601 timestamp.")
    add_body_p(doc, "3. Navigate to the Admin Portal URL: http://localhost:5173/login.")
    add_body_p(doc, "4. Verify the login screen loads with the official Maharashtra Prisons emblem, the dual-pane layout, and the branded hero wallpaper loaded from site settings (/api/v1/settings/login_config).")

    add_heading_3(doc, "0.2 Negative Validation: Invalid Credentials Handling")
    add_body_p(doc, "1. On the /login screen, enter email: 'invalid.user@mahaprisons.gov.in' and password: 'WrongPassword999'.")
    add_body_p(doc, "2. Click 'Sign In to Dashboard'.")
    add_body_p(doc, "3. Verify the system blocks authentication, displays an animated red error alert stating 'Invalid email or password', and does not generate a JWT token.")

    add_heading_3(doc, "0.3 Positive Validation: Authenticated Role Logins")
    add_body_p(doc, "1. Enter Super Admin credentials: admin@mahaprisons.gov.in / admin123.")
    add_body_p(doc, "2. Click 'Sign In to Dashboard'. Verify immediate redirection to / (Dashboard Home).")
    add_body_p(doc, "3. Inspect the sidebar header: verify the MahaPrisons logo, user email 'admin@mahaprisons.gov.in', and role tag 'SUPER_ADMIN' are displayed.")
    add_body_p(doc, "4. Verify the 'User Management' menu link is visible in the sidebar navigation.")
    add_body_p(doc, "5. Click the 'Log out' button in the sidebar bottom corner. Verify the JWT token is removed from localStorage and the browser redirects to /login.")
    add_body_p(doc, "6. Test 'force=true' parameter: navigate to /login?force=true while authenticated; verify automatic session invalidation without infinite redirect loops.")

    add_callout(doc, "NOTE", "The backend incorporates a development fallback in auth.js allowing passwords 'admin123' or 'admin' for seeded accounts even if local bcrypt salt hashes drift.")

    add_body_p(doc, "What to Check in Module 0:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "JWT Bearer token correctly saved in localStorage and transmitted in HTTP Authorization headers.")
    add_bullet(doc, "Protected routes strictly redirect unauthenticated requests to /login.")
    add_bullet(doc, "Sidebar dynamically adjusts navigation options based on decoded user role.")

    # ----------------------------------------------------
    # MODULE 1: User Management
    # ----------------------------------------------------
    add_heading_2(doc, "Module 1: Administrative User Management & Role-Based Access Control (RBAC)")
    add_body_p(doc, 
        "This module validates the creation, modification, and credential management of departmental users across Maker, Checker, and Super Admin tiers. It ensures strict role enforcement and safeguards administrative identity integrity."
    )
    add_metadata_table(doc, 
        "Super Admin (SUPER_ADMIN only)", 
        "Sidebar -> User Management (/users)", 
        "Module 0 (Authenticated as Super Admin)"
    )

    add_heading_3(doc, "1.1 Access Control Boundary Verification")
    add_body_p(doc, "1. Log in as Content Maker (maker@mahaprisons.gov.in) and attempt to directly browse to http://localhost:5173/users.")
    add_body_p(doc, "2. Verify the portal renders an 'Access Denied: Only Super Admins can access User Management' alert and the backend API returns HTTP 403 Forbidden.")
    add_body_p(doc, "3. Log out and re-authenticate as Super Admin (admin@mahaprisons.gov.in). Navigate to /users.")

    add_heading_3(doc, "1.2 Add New Content Maker and Checker Accounts")
    add_body_p(doc, "1. Click the 'Add New User' button in the top-right header.")
    add_body_p(doc, "2. In the modal, fill in: Full Name: 'Inspector Rajesh Patil', Email: 'rajesh.patil@mahaprisons.gov.in', Password: 'MakerPass@2026', Role: Select 'MAKER'.")
    add_body_p(doc, "3. Click 'Save User'. Verify success notification and verify the new user appears in the user list table with a blue 'MAKER' badge.")
    add_body_p(doc, "4. Click 'Add New User' again: Full Name: 'DySP Sunita Deshmukh', Email: 'sunita.deshmukh@mahaprisons.gov.in', Password: 'CheckerPass@2026', Role: Select 'CHECKER'.")
    add_body_p(doc, "5. Click 'Save User' and verify the new entry with a green 'CHECKER' badge.")

    add_heading_3(doc, "1.3 User Search, Credential Update & Self-Deletion Safeguard")
    add_body_p(doc, "1. In the search input box ('Search users...'), type 'Rajesh'. Verify instant table filtering.")
    add_body_p(doc, "2. Click the 'Edit' (pencil) icon next to Rajesh Patil. Leave password blank, change Full Name to 'Senior Inspector Rajesh Patil', and click Save.")
    add_body_p(doc, "3. Verify the name updates in the table without resetting or corrupting his existing password hash.")
    add_body_p(doc, "4. Attempt self-deletion: Click the 'Delete' (trash) icon next to your own logged-in account (admin@mahaprisons.gov.in).")
    add_body_p(doc, "5. Confirm the deletion prompt. Verify the backend explicitly returns HTTP 400 with error 'Cannot delete your own account'.")

    add_callout(doc, "CAUTION", "Deleting an administrative user account permanently removes their revision records and cascade-deletes their audit history. Never delete active test accounts.")

    add_body_p(doc, "What to Check in Module 1:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "Duplicate email registration is blocked with a clear 'User with this email already exists' message.")
    add_bullet(doc, "Non-Super-Admin roles are strictly barred from viewing or querying /api/v1/users.")
    add_bullet(doc, "Password fields in edit modal are optional and only update password hash when explicitly populated.")

    # ----------------------------------------------------
    # MODULE 2: Media Asset Management
    # ----------------------------------------------------
    add_heading_2(doc, "Module 2: Centralized Media Asset Management & CDN Storage")
    add_body_p(doc, 
        "This module validates the central file repository where departmental photos, leadership portraits, government seals, and official PDFs are uploaded and categorized. Uploaded media is used across all content blocks and site settings."
    )
    add_metadata_table(doc, 
        "Super Admin, Content Maker", 
        "Sidebar -> Media Library (Popup Modal across all screens)", 
        "Module 0 (Authenticated Session)"
    )

    add_heading_3(doc, "2.1 Media Modal Invocation & Category-Specific Upload")
    add_body_p(doc, "1. Click 'Media Library' in the left sidebar menu (or click the image icon inside any block editor).")
    add_body_p(doc, "2. Verify the Media Library modal opens with search input, category filter tabs ('All', 'Images', 'Logos', 'Docs'), and asset grid.")
    add_body_p(doc, "3. Click the 'Upload File' button. Verify the category selector modal appears prompting to choose 'Image', 'Logo', or 'Doc'.")
    add_body_p(doc, "4. Select 'Logo'. Choose an institutional emblem image (e.g., yerwada_seal.png).")
    add_body_p(doc, "5. Verify the upload executes, automatically prefixes the filename with 'logo_', saves metadata to the Media table, and displays the image thumbnail.")
    add_body_p(doc, "6. Select 'Doc'. Upload an official government notification PDF (e.g., prison_rules_2026.pdf).")
    add_body_p(doc, "7. Verify the PDF is saved with 'doc_' prefix and displays a dedicated PDF document card.")

    add_heading_3(doc, "2.2 File Size Limit & Format Validation")
    add_body_p(doc, "1. Attempt to upload an oversized file exceeding 4.5 MB (e.g., a 6 MB raw photo).")
    add_body_p(doc, "2. Verify upload failure: backend Multer middleware blocks the request to comply with serverless payload restrictions.")
    add_body_p(doc, "3. Attempt to upload an invalid file extension (e.g., .exe, .zip, or .docx).")
    add_body_p(doc, "4. Verify rejection with alert: 'Error: Invalid file type! Only images and PDFs are allowed.'")

    add_heading_3(doc, "2.3 Asset Search, URL Copying & Deletion")
    add_body_p(doc, "1. Type 'logo' into the search filter. Verify only logo assets are displayed.")
    add_body_p(doc, "2. Click on the uploaded logo thumbnail. Verify the asset URL is copied to the clipboard or selected for the active editor field.")
    add_body_p(doc, "3. Click the trash can icon on a newly uploaded test file, confirm prompt, and verify immediate removal from the asset list.")

    add_callout(doc, "IMPORTANT", "Maximum allowable file upload limit is strictly 4.5 MB across both local Multer storage and cloud Supabase CDN storage buckets.")

    add_body_p(doc, "What to Check in Module 2:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "MIME type verification accepts .jpg, .jpeg, .png, .gif, .svg, .webp, and .pdf.")
    add_bullet(doc, "Full public URLs (relative in dev, CDN-prefixed in production) are accurately stored in database.")
    add_bullet(doc, "Category tabs ('Images', 'Logos', 'Docs') accurately filter items based on filename conventions.")

    # ----------------------------------------------------
    # MODULE 3: Site Settings
    # ----------------------------------------------------
    add_heading_2(doc, "Module 3: Global Portal Branding & Institutional Site Settings")
    add_body_p(doc, 
        "This module configures the overarching institutional identity of the MahaPrisons portal, including universal bilingual headers, footer directories, rotating homepage wallpapers, and login screen aesthetics."
    )
    add_metadata_table(doc, 
        "Super Admin, Content Maker", 
        "Sidebar -> Settings (/settings)", 
        "Modules 0, 2 (Uploaded Logos & Wallpapers)"
    )

    add_heading_3(doc, "3.1 Settings Dashboard & Tab Navigation")
    add_body_p(doc, "1. Navigate to /settings. Verify the Settings Dashboard displays four configuration cards: 'Header Settings', 'Footer Settings', 'Home Wallpapers', and 'Login Page Settings'.")
    add_body_p(doc, "2. Click 'Header Settings'. Verify the split-screen view loads with live Next.js preview on the left and form controls on the right.")

    add_heading_3(doc, "3.2 Universal Header Configuration")
    add_body_p(doc, "1. In 'Department Logo', verify or update logo_src with the logo uploaded in Module 2.")
    add_body_p(doc, "2. Set Logo Link: 'https://mahaprisons.gov.in'.")
    add_body_p(doc, "3. In 'Main Department Title (Marathi)', enter: 'महाराष्ट्र राज्य कारागृह व सुधारसेवा विभाग' using Phonetic Marathi typing.")
    add_body_p(doc, "4. Click the translation button between fields. Verify the English title auto-translates to 'Maharashtra State Prisons and Correctional Services Department'.")
    add_body_p(doc, "5. Under 'Right Partner Logos', add two government partners: National Emblem ('/uploads/emblem.svg') linking to 'https://www.india.gov.in' and Digital India ('/uploads/digital_india.png') linking to 'https://digitalindia.gov.in'.")
    add_body_p(doc, "6. Observe the left preview pane: verify the header instantly updates in real-time via window.postMessage without page flickering.")

    add_heading_3(doc, "3.3 Universal Footer & Contact Directory")
    add_body_p(doc, "1. Switch to 'Footer Settings' tab.")
    add_body_p(doc, "2. In 'Copyright (Bilingual)', verify English: 'Contents owned and maintained by Yerawada Open Prison.' and Marathi: 'मालकीची सामग्री येरवडा खुले कारागृह'.")
    add_body_p(doc, "3. In 'Institutional Contact Details', enter: Address (English): 'Yerawada Open Prison, Airport Road, Pune, Maharashtra 411006', Address (Marathi): 'येरवडा खुले कारागृह, विमानतळ रस्ता, पुणे, महाराष्ट्र ४११००६', Phone: '020-26694051', Email: 'yerwadaop-mh@gov.in'.")
    add_body_p(doc, "4. In 'Footer Quick Links', ensure standard links are present: Home, About Us, Activities, Website Policies, Contact Us, and Feedback.")

    add_heading_3(doc, "3.4 Home Wallpapers & Login Screen Customization")
    add_body_p(doc, "1. Switch to 'Home Wallpapers' tab. Verify 5 rotating background images are loaded.")
    add_body_p(doc, "2. Change 'Animation Transition Time' to 5.0 seconds. Observe the live preview wallpaper transition speed.")
    add_body_p(doc, "3. Switch to 'Login Page Settings'. Click 'Choose from Library' and select a prison facility photograph. Verify live preview of /login updates instantly.")

    add_heading_3(doc, "3.5 Saving Settings (Maker vs Super Admin)")
    add_body_p(doc, "1. If logged in as Super Admin: Click 'Save Changes'. Verify direct database upsert (PUT /api/v1/settings/:key).")
    add_body_p(doc, "2. If logged in as Content Maker: Click 'Submit for Review'. Enter change summary: 'Updated universal department header and headquarters telephone number'. Verify a revision request is created.")

    add_callout(doc, "TIP", "Use the 'Undo' (Ctrl+Z) and 'Redo' buttons in the editor header bar to revert accidental keystrokes before saving.")

    add_body_p(doc, "What to Check in Module 3:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "Live preview frame syncs header and footer updates instantaneously via PREVIEW_UPDATE messages.")
    add_bullet(doc, "Bilingual fields synchronize smoothly with Google Input Tools phonetic transliteration.")
    add_bullet(doc, "Maker submissions generate a pending revision rather than directly committing to live site settings.")

    # ----------------------------------------------------
    # MODULE 4: Menu Editor
    # ----------------------------------------------------
    add_heading_2(doc, "Module 4: Dynamic Navigation & Hierarchical Mega-Menu Management")
    add_body_p(doc, 
        "This module manages the hierarchical multi-level Mega Menu navigation bar. Administrators can build 3-tier deep navigation structures, define column groups, bind Lucide icons, and map menu items to internal page slugs or external portals."
    )
    add_metadata_table(doc, 
        "Super Admin, Content Maker", 
        "Sidebar -> Navigation (/menu)", 
        "Modules 0, 2, 3 (Branding & Icons)"
    )

    add_heading_3(doc, "4.1 Inspect Baseline Menu Hierarchy")
    add_body_p(doc, "1. Navigate to /menu. Verify the tree structure displays the root navigation nodes: 'Home' (मुख्यपृष्ठ), 'Yerwada Open District Prison' (येरवडा खुले जिल्हा कारागृह), 'Administrative' (प्रशासकीय), 'Facilities' (सुविधा), 'Agriculture' (शेती), 'Social' (सामाजिक उपक्रम), 'Cultural' (सांस्कृतिक), 'Notable Work' (उल्लेखनीय कार्य), and 'Contact' (संपर्क).")
    add_body_p(doc, "2. Click the chevron toggle next to 'Agriculture' to expand its nested subitems.")

    add_heading_3(doc, "4.2 Reordering Menu Nodes (Up / Down Shifts)")
    add_body_p(doc, "1. In the 'Agriculture' tree, locate 'Poultry Farming' and 'Nursery'.")
    add_body_p(doc, "2. Click the 'Move Up' arrow button next to 'Poultry Farming'.")
    add_body_p(doc, "3. Verify 'Poultry Farming' shifts positions with 'Nursery', and the 'Save Changes' button in the header becomes active.")
    add_body_p(doc, "4. Test the 'Undo' button in the header: click Undo and verify the nodes revert to their original order.")

    add_heading_3(doc, "4.3 Add New Root Menu and Mega-Menu Column Groups")
    add_body_p(doc, "1. Click 'Add Root Item' at the bottom of the tree.")
    add_body_p(doc, "2. In the right edit pane, enter: Label (English): 'Prison Reforms', Label (Marathi): 'कारागृह सुधारणा'.")
    add_body_p(doc, "3. Check the 'Set Group Header / Mega Group' checkbox. Notice href is cleared automatically.")
    add_body_p(doc, "4. Click 'Select Icon'. Search for 'ShieldCheck' in the IconPicker modal and select it.")
    add_body_p(doc, "5. Click 'Save Item'. In the tree, locate the newly created 'Prison Reforms' node.")
    add_body_p(doc, "6. Click 'Add Column Group' under 'Prison Reforms'. Enter Group Title: 'Modernization 2026' (आधुनिकीकरण २०२६).")
    add_body_p(doc, "7. Under 'Modernization 2026', click 'Add Link'. Enter: Label: 'E-Prisons Biometrics' (ई-प्रिझन्स बायोमेट्रिक्स), Link URL: '/reforms/biometrics'. Click Save.")

    add_heading_3(doc, "4.4 Saving Menu Updates & Atomic Replacement")
    add_body_p(doc, "1. Click the top-level 'Save Changes' button.")
    add_body_p(doc, "2. Verify the backend executes an atomic Prisma transaction ($transaction) that replaces the menuItem table tree.")
    add_body_p(doc, "3. If logged in as Maker, verify an alert confirms: 'Changes sent for review' and creates a Revision record under modelName: 'Menu'.")

    add_callout(doc, "CAUTION", "The 'Home' (मुख्यपृष्ठ) root node is locked against deletion or mega-group transformation because it maps directly to the portal root route (/).")

    add_body_p(doc, "What to Check in Module 4:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "Hierarchy supports up to 3 tiers: Root Navigation Item -> Mega Column Header -> Subitem Link.")
    add_bullet(doc, "Lucide icon picker dynamically renders over 50 government and administrative icons.")
    add_bullet(doc, "Phonetic transliteration and one-click translation work seamlessly on menu labels.")

    # ----------------------------------------------------
    # MODULE 5: Homepage Content
    # ----------------------------------------------------
    add_heading_2(doc, "Module 5: Fixed Homepage Content & Institutional Showcase Management")
    add_body_p(doc, 
        "This module manages the eight specialized, high-impact content sections that comprise the official landing page (slug: '/'). These fixed blocks include the animated Hero Carousel, Minister Leadership Profiles, Announcements Tabs with PDF metadata, Jail Insights, Holiday Calendar, and Emergency Helplines."
    )
    add_metadata_table(doc, 
        "Super Admin, Content Maker", 
        "Sidebar -> Page Editor (/page-editor?slug=/) [Fixed Homepage Layout]", 
        "Modules 0, 2, 3 (Media & Site Settings)"
    )

    add_heading_3(doc, "5.1 Hero Carousel & Mission Statements")
    add_body_p(doc, "1. Open /page-editor?slug=/. Verify the live preview renders the homepage inside the scaled 1280px preview container.")
    add_body_p(doc, "2. Select 'hero_carousel' block. Expand Slide 1 ('Rehabilitation / पुनर्वसन').")
    add_body_p(doc, "3. Update Statement (Marathi): 'श्रमातून परिवर्तनाची वाट.' -> English: 'Path of transformation through labor.'")
    add_body_p(doc, "4. Change the hero slide image via the Media Library to open_jail_farming.jpg.")
    add_body_p(doc, "5. Verify the live preview iframe instantly updates the slide image and headline without reloading.")

    add_heading_3(doc, "5.2 Leadership Profiles (Minister & Director General)")
    add_body_p(doc, "1. Select 'minister_profiles' block.")
    add_body_p(doc, "2. Verify three profile cards: Chief Minister, Deputy Chief Minister, and Director General of Prisons & Correctional Services.")
    add_body_p(doc, "3. In Card 3 (Director General), update Name (English): 'Shri. Amitabh Gupta, IPS', Designation (Marathi): 'अपर पोलीस महासंचालक व महानिरीक्षक, कारागृह व सुधारसेवा'.")
    add_body_p(doc, "4. Verify the leadership photo renders with high contrast and proper aspect ratio in the live preview.")

    add_heading_3(doc, "5.3 Announcements Tabs & Gazette/Tender PDF Downloads")
    add_body_p(doc, "1. Select 'announcements_tabs' block. Verify three category tabs: 'Recruitment' (भरती), 'Tenders' (निविदा), and 'Notices' (सूचना).")
    add_body_p(doc, "2. In the 'Tenders' tab, click 'Add Item'.")
    add_body_p(doc, "3. Enter Title (Marathi): 'येरवडा कारागृह शेती अवजारे खरेदी ई-निविदा २०२६'. Title (English): 'E-Tender for Agricultural Implements Procurement 2026'.")
    add_body_p(doc, "4. Set Date: '2026-11-20', URL: '/uploads/pdfs/202603241442150231.pdf'.")
    add_body_p(doc, "5. In the live preview, click the Tenders tab: verify the new notice displays with a distinct red 'PDF' badge and file size indicator.")

    add_heading_3(doc, "5.4 Institutional Holiday Calendar & Jail Insights")
    add_body_p(doc, "1. Select 'holiday_calendar' block. Verify the 2026 official Maharashtra government holidays table.")
    add_body_p(doc, "2. Add a new holiday: 'Maharashtra Day' (महाराष्ट्र दिन), Date: '01 May 2026', Type: 'Public Holiday'.")
    add_body_p(doc, "3. Select 'jail_insights' block: verify 6 reform metric cards and YouTube channel URL ('https://www.youtube.com/@CShamkant').")

    add_callout(doc, "NOTE", "On the Homepage, blocks are structurally fixed components. Editors customize text, links, and photos within structured forms but cannot delete structural blocks.")

    add_body_p(doc, "What to Check in Module 5:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "Hero Carousel auto-play transitions pause on mouse hover to meet WCAG 2.1 AA accessibility.")
    add_bullet(doc, "Announcements list items display downloadable PDF file sizes in accordance with GIGW 3.0 guidelines.")
    add_bullet(doc, "YouTube video links embed securely without cross-origin tracking violations.")

    # ----------------------------------------------------
    # MODULE 6: Facility Profile
    # ----------------------------------------------------
    add_heading_2(doc, "Module 6: Dedicated Prison Facility Profile — Yerwada Open District Prison")
    add_body_p(doc, 
        "This module manages the dedicated facility presentation page for Maharashtra's flagship correctional institution (slug: 'yerawada-open-jail'). It encompasses historical chronicles, supervisory hierarchies, prisoner rehabilitation metrics, and daily reform routines."
    )
    add_metadata_table(doc, 
        "Super Admin, Content Maker", 
        "Sidebar -> Page Editor (/page-editor?slug=yerawada-open-jail)", 
        "Modules 0, 2, 4 (Media & Menu Routing)"
    )

    add_heading_3(doc, "6.1 Prison Hero Section & Overview Statistics")
    add_body_p(doc, "1. Browse to /page-editor?slug=yerawada-open-jail.")
    add_body_p(doc, "2. In 'prison_hero' block, verify Facility Title: 'Yerwada Open District Prison Pune' (येरवडा खुले जिल्हा कारागृह, पुणे).")
    add_body_p(doc, "3. In 'prison_overview' block, inspect the four operational statistics counters: Total Land Area (५१२ एकर / 512 Acres), Established Year (१९५६ / 1956), Capacity (५०० बंदी / 500 Inmates), Security Classification (किमान सुरक्षा / Minimum Security).")
    add_body_p(doc, "4. Update 'Capacity' to '५५० बंदी' and verify the metric card reflects the change in the live preview.")

    add_heading_3(doc, "6.2 History Timeline & Milestone Chronicle")
    add_body_p(doc, "1. Select 'prison_timeline' block. Verify milestones spanning 1956 (Inauguration by Chief Minister Morarji Desai) to 2026 (Modern Organic Farming Hub).")
    add_body_p(doc, "2. Add a milestone: Year: '2024', Title: 'Smart Card Calling System', Description: 'Introduction of digital calling kiosks for inmates to communicate with registered family members'.")

    add_heading_3(doc, "6.3 Administration Hierarchy & Facility Activities")
    add_body_p(doc, "1. Select 'prison_administration' block. Verify officers: Superintendent (वर्ग-१), Senior Jail Officer (श्रेणी १), and Medical Officer.")
    add_body_p(doc, "2. Select 'prison_activities' block: verify cards for Organic Agriculture, Dairy Farming, Poultry, and Chain Canteen (शृंखला उपहारगृह).")
    add_body_p(doc, "3. Click 'Save & Publish' (Super Admin) or 'Send for Review' (Maker).")

    add_callout(doc, "TIP", "In the split-screen editor, clicking on any section heading inside the preview iframe automatically scrolls the right-hand form pane to that exact block.")

    add_body_p(doc, "What to Check in Module 6:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "Historical timeline renders chronologically with alternating visual milestone cards.")
    add_bullet(doc, "Officer designations and contact information match Maharashtra Home Department gazettes.")
    add_bullet(doc, "Bilingual numbers in Marathi (१, २, ३...) and English (1, 2, 3...) format consistently across statistics widgets.")

    # ----------------------------------------------------
    # MODULE 7: Dynamic Pages & 25 Templates
    # ----------------------------------------------------
    add_heading_2(doc, "Module 7: Dynamic Page Authoring & Semantic Template Engine (25 Layouts)")
    add_body_p(doc, 
        "This centerpiece module validates the zero-code dynamic template architecture. Departmental staff can author over 40 distinct departmental, agricultural, and citizen service pages by choosing from 25 semantic GIGW 3.0 design templates. It validates instant dummy data pre-seeding, WeakMap deterministic key stabilization, sticky tab navigation, and draft template reverting."
    )
    add_metadata_table(doc, 
        "Super Admin, Content Maker", 
        "Sidebar -> Page Editor (/page-editor?slug=[any-dynamic-slug])", 
        "Modules 0, 2, 4 (Menu Slugs & Uploaded Media)"
    )

    add_heading_3(doc, "7.1 The 25 Semantic Design Templates Catalog")
    add_body_p(doc, "The platform incorporates 25 pre-engineered semantic design templates:")

    tpl_table = doc.add_table(rows=26, cols=3)
    tpl_data = [
        ("Template Identifier", "Display Name & Structure", "Optimal Departmental Use Case"),
        ("BasicFeatureGrid", "Header banner, 3-column feature cards, stats widget, contact block", "Establishment, Judicial, Rationing, Departmental sections"),
        ("CardsAndVerticalTimeline", "Milestone chronicles, vertical timeline with date badges & cards", "Chronological reforms, department history, progressive reviews"),
        ("ContactInfoGrid", "Structured contact directory, key functions grid, interactive location", "Headquarters office, regional administration, legal aid cells"),
        ("ContactUsLayout", "Full departmental HQ directory, regional officer cards, inquiry form", "Primary /contact page, citizen grievance offices"),
        ("ContentWithAccordion", "Overview text, collapsible FAQ & regulation accordions, contact footer", "Prison rules, furlough/parole eligibility FAQs, legal rights"),
        ("ContentWithRightSidebar", "Narrative report, highlight quote, flanked by stats & contact sidebar", "Annual administrative reviews, inspection reports, official visits"),
        ("ContentWithTabs", "Tabbed document views, categorization buttons, statistical footer", "Complex administrative wings (Factory, Hospital, Security)"),
        ("GalleryLayout", "Categorized photo albums, modal lightbox zoom, bilingual captions", "Primary /gallery page, institutional photo archives"),
        ("HeroBannerWithArticles", "Full-bleed hero banner, categorized article & press release cards", "Press releases, departmental gazettes, reform articles"),
        ("HeroBannerWithBadges", "Hero banner, official certification badges, award highlights", "State & national corrections excellence awards, ISO accreditations"),
        ("HeroBannerWithMedia", "Hero banner, institutional video reels, photo essay grid", "Multimedia documentaries, reform success reels"),
        ("HeroFeatureList", "Numbered protocol cards, security guidelines, operating procedures", "Security protocols, prisoner interview rules, escort standards"),
        ("HeroFeaturesTimelineLayout", "Comprehensive facility banner, stats, feature grid, vertical timeline", "Large sub-jails, central prison overview, facility profiling"),
        ("HeroSplitTimeline", "Dual-column layout: operational protocols balanced against timelines", "Prison system modernization, historical timeline balancing"),
        ("HeroStatsGrid", "High-impact metrics grid, operational showcase gallery, office hours", "High-productivity units (Yerwada Press, Textile Factory)"),
        ("HeroThreeColGrid", "Production stats, active modernization projects, social impact statements", "Agriculture divisions, bakery units, carpentry industries"),
        ("HeroWithMenuGrid", "Hero banner, interactive service card grid with quick links", "Inmate canteens, canteen tariff cards, telephone facility"),
        ("HeroWithPricingList", "Public rate cards, service packages, social reform impact statement", "Inmate vocational service price lists, laundry services, salon rates"),
        ("HeroWithProcessGrid", "Step-by-step procedural flowchart cards, technical requirements", "Visitor booking procedures, bail filing steps, parole application"),
        ("IconsListWithTimeline", "Visual icon directory paired with chronological milestone tracking", "Vocational training trade streams, educational curriculum"),
        ("MinimalIconGrid", "Clean, distraction-free service cards for rapid citizen navigation", "Citizen quick links, helpline directories, public services"),
        ("ProductsLayout", "Product catalog cards, pricing, inmate trade tags, category filters", "Primary /our-products catalog, bakery, furniture, handloom"),
        ("SideBySideListCards", "Comparative paired cards, dual-department operational streams", "Open vs Central prison comparisons, internal vs external security"),
        ("ThreeColServiceCards", "3-column commercial service cards, bottom showcase gallery", "Commercial units: Mangal Lawn, Minda auto unit, Furniture"),
        ("TwoColEventCards", "Scheduled cultural events, reform workshops, sports meets with dates", "Kirtan/Bhajan events, Yoga meditation camps, sports days")
    ]
    for r_idx, row in enumerate(tpl_data):
        for c_idx, val in enumerate(row):
            tpl_table.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(tpl_table, col_widths=[2.0, 2.8, 2.0], header_bg='0F172A')

    p_sp3 = doc.add_paragraph()
    p_sp3.paragraph_format.space_before = Pt(4)
    p_sp3.paragraph_format.space_after = Pt(6)

    add_heading_3(doc, "7.2 Visual Template Modal Selection & Instant Starter Dummy Data Pre-seeding")
    add_body_p(doc, "1. Navigate to an existing unstyled dynamic page, such as /page-editor?slug=agriculture/nursery.")
    add_body_p(doc, "2. In the right pane, click 'Change' (or 'Choose Template' if unconfigured).")
    add_body_p(doc, "3. Verify the TemplateSelectorModal opens displaying visual thumbnail previews and descriptions for all 25 layouts.")
    add_body_p(doc, "4. Click on 'HeroThreeColGrid'. Notice the confirmation modal explains that the new template will load with pre-seeded starter data, while previous data is archived safely in _archived_data.")
    add_body_p(doc, "5. Click 'Confirm Change / बदल निश्चित करा'.")
    add_body_p(doc, "6. Verify the Zero-Blank-Screen Guarantee: the live preview immediately renders a rich, balanced layout pre-populated with starter banners, production stats, active projects, and impact statements.")

    add_heading_3(doc, "7.3 WeakMap Deterministic Key Stabilization Verification")
    add_body_p(doc, "1. In the right-hand editor pane, navigate to the 'Active Projects' section.")
    add_body_p(doc, "2. Type rapidly in a Marathi phonetic input field (e.g., typing 'roprovan' to produce 'रोपवाटिका').")
    add_body_p(doc, "3. Verify that typing does NOT lose cursor focus or stutter. (In useBlockEditorState.ts, array items receive deterministic keys via WeakMap rather than Math.random(), eliminating DOM rebuild thrashing).")

    add_heading_3(doc, "7.4 Draft Layout State & Revert Safeguards")
    add_body_p(doc, "1. Notice that after selecting a new template, an amber badge appears: '_is_draft_layout: true' and a 'Cancel Draft' button becomes visible.")
    add_body_p(doc, "2. Click 'Cancel Draft' and confirm prompt. Verify the editor immediately restores the original published template and content from the database.")

    add_heading_3(doc, "7.5 Sticky Section Tabs & Deep In-Iframe Anchor Navigation")
    add_body_p(doc, "1. In the editor pane for any multi-section template, observe the sticky tab bar at the top (e.g., [Hero Banner] [Main Content] [Key Features] [Stats Widget] [Contact Details]).")
    add_body_p(doc, "2. Click 'Key Features'. Verify the form scrolls directly to the Key Features inputs.")
    add_body_p(doc, "3. In the live preview iframe, click on the contact details box. Verify the iframe transmits a BLOCK_SELECTED event to the parent window, which automatically activates the 'Contact Details' tab.")

    add_callout(doc, "IMPORTANT", "Template switching preserves common fields (title, subtitle, description, heroImage). Template-specific fields are archived under _archived_data[layoutType] so switching back does not destroy previously authored content.")

    add_body_p(doc, "What to Check in Module 7:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "Selecting any of the 25 templates never displays an empty or broken preview.")
    add_bullet(doc, "Phonetic Marathi transliteration provides accurate 5-word candidate suggestion popups with arrow-key navigation.")
    add_bullet(doc, "One-click bidirectional translation converts text between English and Marathi via Google Translation API proxy.")

    # ----------------------------------------------------
    # MODULE 8: Maker-Checker Governance
    # ----------------------------------------------------
    add_heading_2(doc, "Module 8: Enterprise Maker-Checker Dual-Authorization Review Workflow")
    add_body_p(doc, 
        "This critical governance module enforces the state government dual-authorization mandate. Changes proposed by Content Makers cannot reach the public portal until an authorized Checker or Super Admin evaluates the visual diff, inspects the future-state preview, and formally approves the revision."
    )
    add_metadata_table(doc, 
        "Content Maker (Submission), Checker Admin / Super Admin (Approval)", 
        "Sidebar -> Review Queue (/review)", 
        "Modules 3, 4, 5, 6, 7 (Staged Revisions)"
    )

    add_heading_3(doc, "8.1 Maker Submission Workflow")
    add_body_p(doc, "1. Log in as Content Maker (maker@mahaprisons.gov.in).")
    add_body_p(doc, "2. Navigate to /settings. In Header Settings, change main title (Marathi) to: 'महाराष्ट्र कारागृह सुधारसेवा विभाग - पुणे विभाग'.")
    add_body_p(doc, "3. Click 'Submit for Review'. Verify a modal prompts for a Change Summary.")
    add_body_p(doc, "4. Enter Change Summary: 'Annual departmental nomenclature update for Pune region'. Click Submit.")
    add_body_p(doc, "5. Navigate to /review. Verify the page title displays as 'My Submissions'.")
    add_body_p(doc, "6. Verify your proposed change appears in the table with status badge 'Pending' (amber), content type 'Header Settings', and timestamp.")
    add_body_p(doc, "7. Verify Maker actions: Maker can click 'Preview' to view their submission, or click the red 'Trash' icon to cancel the pending request before review.")

    add_heading_3(doc, "8.2 Checker Inspection, Visual Diff & Dedicated Revision Preview")
    add_body_p(doc, "1. Log out and log in as Checker Admin (checker@mahaprisons.gov.in).")
    add_body_p(doc, "2. Navigate to /review. Verify the page title displays as 'Review Queue' with subtitle 'Review and publish content submitted by editors.'")
    add_body_p(doc, "3. In the queue table, locate the revision submitted by the Maker in Step 8.1.")
    add_body_p(doc, "4. Click the 'Preview' button. Verify the comprehensive Review Proposed Changes modal opens.")
    add_body_p(doc, "5. Review the 'Maker's Change Description' banner displaying the exact text entered by the Maker.")
    add_body_p(doc, "6. Click 'View Live Preview'. Verify a new browser tab opens to: /preview-revision?revisionId=[id] (or [slug]?preview=true&revisionId=[id]).")
    add_body_p(doc, "7. Verify the preview tab renders the complete public portal displaying the proposed changes overlaid on live production data, without affecting what other citizens see.")

    add_heading_3(doc, "8.3 Checker Rejection Workflow (Mandatory Feedback)")
    add_body_p(doc, "1. In the Review Modal, leave the 'Rejection Reason' field blank and click 'Reject Changes'.")
    add_body_p(doc, "2. Verify the system blocks the action: the 'Reject Changes' button remains disabled until a reason is provided.")
    add_body_p(doc, "3. In 'Rejection Reason (if rejecting)', enter: 'Please verify the official Marathi spelling with the Director General gazette before resubmitting.'")
    add_body_p(doc, "4. Click 'Reject Changes'. Verify an alert confirms rejection and the revision status updates to 'REJECTED'.")
    add_body_p(doc, "5. Switch back to Content Maker: navigate to /review ('My Submissions'); verify the revision is marked with a red 'Rejected' badge and displays the Checker's rejection feedback.")

    add_heading_3(doc, "8.4 Checker Approval & Atomic Database Publication")
    add_body_p(doc, "1. Have the Maker submit a clean revision (e.g., updating visiting hours in Contact page).")
    add_body_p(doc, "2. Log in as Checker Admin. Open the Review Modal for the new revision.")
    add_body_p(doc, "3. Click 'Approve & Publish' (green button).")
    add_body_p(doc, "4. Verify success alert: 'Revision approved and published successfully.'")
    add_body_p(doc, "5. Verify that in the backend, the revision status is set to 'APPROVED', reviewedById is recorded, and the proposed data is committed into the production table (ContentBlock, MenuItem, or SiteSetting).")
    add_body_p(doc, "6. Open the public website (http://localhost:3000): verify the approved changes are now immediately visible to the public.")

    add_callout(doc, "CAUTION", "Checkers cannot edit the proposed payload directly. If corrections are needed, the revision must be rejected with constructive feedback so the Maker can submit an amended draft.")

    add_body_p(doc, "What to Check in Module 8:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "Maker role is strictly prevented from directly modifying production database records.")
    add_bullet(doc, "Checker role cannot approve revisions without inspecting proposed diffs.")
    add_bullet(doc, "Approval execution atomically merges content into live tables and marks revision history.")

    # ----------------------------------------------------
    # MODULE 9: Audit Logs
    # ----------------------------------------------------
    add_heading_2(doc, "Module 9: Immutable Audit Trails & Compliance Logging")
    add_body_p(doc, 
        "This module validates the tamper-proof administrative log archive (/audit-logs). It maintains an immutable historical record of every configuration change, menu rearrangement, page revision, checker approval, and rejection reason for statutory government compliance."
    )
    add_metadata_table(doc, 
        "Super Admin, Checker Admin, Content Maker", 
        "Sidebar -> Audit Logs (/audit-logs)", 
        "Module 8 (Executed Review Actions)"
    )

    add_heading_3(doc, "9.1 Verify Audit Log Ingestion & Metadata Completeness")
    add_body_p(doc, "1. Navigate to /audit-logs.")
    add_body_p(doc, "2. Verify the comprehensive table lists all historical revisions in reverse chronological order.")
    add_body_p(doc, "3. Verify every log entry contains complete metadata: Content Type (displayType), Change Description (changeSummary), Submitted By (name & email), Submission Date/Time, Status Badge ('Approved' green, 'Rejected' red, 'Pending' amber), and Reviewed By (name & email of approver).")

    add_heading_3(doc, "9.2 Inspect Historical Diff Viewer")
    add_body_p(doc, "1. In any log row, click the 'View Diff' (eye icon) button.")
    add_body_p(doc, "2. Verify the ReviewDiffViewer opens displaying the proposed JSON or tree payload side-by-side with the pre-existing state.")
    add_body_p(doc, "3. For rejected entries, verify the exact 'Rejection Reason' recorded by the Checker is preserved and displayed in a red callout block.")

    add_callout(doc, "NOTE", "Audit logs are read-only across all roles. Neither Content Makers, Checkers, nor Super Admins can alter, truncate, or delete historical audit log records.")

    add_body_p(doc, "What to Check in Module 9:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "Revisions table maintains relational links to User records (createdById, reviewedById).")
    add_bullet(doc, "Timestamps are stored in UTC in PostgreSQL and formatted accurately to local Indian Standard Time (IST) in the UI.")
    add_bullet(doc, "Rejection rationale is permanently bound to rejected records and visible in audit reviews.")

    # ----------------------------------------------------
    # MODULE 10: Citizen Presentation & Accessibility
    # ----------------------------------------------------
    add_heading_2(doc, "Module 10: Citizen Presentation & GIGW 3.0 / WCAG 2.1 AA Accessibility Verification")
    add_body_p(doc, 
        "This final module validates the public presentation layer (web/). It verifies that public citizens encounter a responsive, bilingual, accessible web portal adhering to the Guidelines for Indian Government Websites (GIGW 3.0) and WCAG 2.1 AA standards, with seamless dynamic routing and text-to-speech assistive technology."
    )
    add_metadata_table(doc, 
        "Public Citizen (No login required)", 
        "Public Portal (http://localhost:3000 / production domain)", 
        "Modules 3, 4, 5, 6, 7, 8 (Published Baseline Data)"
    )

    add_heading_3(doc, "10.1 Universal Bilingual Language Toggle (Marathi <-> English)")
    add_body_p(doc, "1. Open http://localhost:3000 in a fresh private/incognito browser window.")
    add_body_p(doc, "2. Verify the top header displays the universal government emblem, department title, and language toggle ('English' / 'मराठी').")
    add_body_p(doc, "3. Click 'मराठी'. Verify the entire page re-renders in authentic Marathi, and the document root element updates to <html lang='mr'>.")
    add_body_p(doc, "4. Click 'English'. Verify the UI switches to English and the root element updates to <html lang='en'>.")

    add_heading_3(doc, "10.2 GIGW 3.0 Accessibility Suite (Font Scaler & Contrast Themes)")
    add_body_p(doc, "1. In the sticky top Accessibility Toolbar, locate the font scaling controls: [A-] [A] [A+].")
    add_body_p(doc, "2. Click [A+] twice. Verify body text scales up to 125% and 150% without clipping, layout breakage, or overlapping headers.")
    add_body_p(doc, "3. Click [A] to reset to standard font scaling.")
    add_body_p(doc, "4. Click the Theme / Contrast dropdown. Verify four compliant contrast options: 'Standard' (प्रमाणित), 'High Contrast' (उच्च विरोधाभास - black on yellow/white), 'Dark Theme' (गडद थीम), and 'Color Inversion' (कलर इनव्हर्जन).")
    add_body_p(doc, "5. Select 'High Contrast'. Verify color contrast ratios across all text elements exceed the WCAG AA minimum requirement of 4.5:1.")

    add_heading_3(doc, "10.3 Bhashini Text-to-Speech Assistive Voice Engine")
    add_body_p(doc, "1. In the Accessibility Toolbar, click the speaker icon ('Listen to Content' / 'मजकूर ऐका').")
    add_body_p(doc, "2. Select any headline or paragraph on the page. Verify the speech synthesis engine initiates voice narration in the active language.")
    add_body_p(doc, "3. Click the mute/speaker toggle again. Verify voice playback terminates immediately.")

    add_heading_3(doc, "10.4 Unified Dynamic Menu & Catch-All Routing Engine")
    add_body_p(doc, "1. In the public Mega Menu, hover over 'Agriculture' (शेती).")
    add_body_p(doc, "2. Click on 'Nursery' (रोपवाटिका). Verify the URL navigates to /agriculture/nursery.")
    add_body_p(doc, "3. Verify the catch-all route (web/src/app/(main)/[...slug]/page.tsx) queries the backend by-slug API and renders the HeroThreeColGrid template configured in Module 7.")
    add_body_p(doc, "4. Test invalid slug fallback: in the browser address bar, enter http://localhost:3000/non-existent-page-test-999.")
    add_body_p(doc, "5. Verify the portal gracefully renders BlankPageFallback ('This page is not yet configured in the CMS database') rather than a generic HTTP 500 crash.")

    add_heading_3(doc, "10.5 Inmate Vocational Products Catalog & Modal Gallery")
    add_body_p(doc, "1. In the navigation menu, click 'Our Products' (/our-products).")
    add_body_p(doc, "2. Verify the vocational product cards display inmate-manufactured goods: Bakery items, Handloom fabrics, Organic honey, and Teakwood furniture.")
    add_body_p(doc, "3. In the menu, click 'Photo Gallery' (/gallery).")
    add_body_p(doc, "4. Click on an album thumbnail (e.g., 'Modern Agriculture Units'). Verify the full-screen modal lightbox opens with image zoom and bilingual caption.")

    add_callout(doc, "TIP", "Use screen reader tools (such as NVDA or Windows Narrator) to verify that all images contain meaningful alt attributes and form elements have aria-label tags.")

    add_body_p(doc, "What to Check in Module 10:", bold_prefix="Verification Criteria: ")
    add_bullet(doc, "Complete public website navigation functions seamlessly without any user login.")
    add_bullet(doc, "Mega-menu expands smoothly on desktop and converts to responsive slide-out drawer on mobile screens.")
    add_bullet(doc, "Accessibility toolbar state (font size, contrast preference) persists across page navigation.")

    doc.add_page_break()

    # ==========================================
    # SECTION 4: MODULES NOT IN THIS TEST ROUND
    # ==========================================
    add_heading_1(doc, "3. Section 4: Modules Not in This Test Round")
    add_body_p(doc, 
        "The following user interface elements, routes, or integrations exist in the current codebase as prototypes, external redirects, or placeholders. Testers are explicitly instructed NOT to log defects or bug tickets against these specific items during this UAT cycle:"
    )

    not_tested_tbl = doc.add_table(rows=6, cols=3)
    not_tested_data = [
        ("Menu Item / Feature Element", "User Role", "Current Implementation Status & UAT Instruction"),
        (
            "Accessibility Toolbar Search Submission (Search icon in top toolbar)",
            "Public Citizen",
            "Redirects to external domain (https://mahaprisons.gov.in/?s=...). The backend internal search index is scheduled for Phase 3. Do not log defect for external redirection."
        ),
        (
            "Standalone Pages Directory Route (/pages)",
            "Super Admin / Maker",
            "The 'Return to Pages' button rendered on 404 screens links to /pages. Pages are currently managed via the Mega-Menu Editor (/menu) and URL slugs. Dedicated table view is in development."
        ),
        (
            "Dashboard Metric Counters ('Draft Pages', 'Pending Review', 'Active Users')",
            "All Admin Roles",
            "The cards on / (Dashboard Home) display static baseline numbers (0, 0, 1). Dynamic metric aggregation services are scheduled for the next release sprint."
        ),
        (
            "Footer Social Media & External Policy Anchors (Twitter, Facebook, Instagram, Privacy Policy '#')",
            "All Roles",
            "Default footer configuration seeds anchor placeholders ('#') for social channels until official departmental handles are certified by the Home Department."
        ),
        (
            "Public Citizen Self-Registration / Portal Login",
            "Public Citizen",
            "By deliberate architectural design, the public portal is a read-only informational and grievance-access service. Citizens do not create accounts; only departmental staff authenticate."
        )
    ]
    for r_idx, row in enumerate(not_tested_data):
        for c_idx, val in enumerate(row):
            not_tested_tbl.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(not_tested_tbl, col_widths=[2.2, 1.4, 3.2], header_bg='0F172A')

    p_sp4 = doc.add_paragraph()
    p_sp4.paragraph_format.space_before = Pt(8)
    p_sp4.paragraph_format.space_after = Pt(8)

    doc.add_page_break()

    # ==========================================
    # ANNEXURE A: PROGRESS CHECKLIST
    # ==========================================
    add_heading_1(doc, "4. Annexure A: Comprehensive Progress Checklist & Milestone Sign-Off")
    add_body_p(doc, "Use this sign-off checklist to verify and record milestone completion across all test modules:")

    check_tbl = doc.add_table(rows=21, cols=4)
    check_data = [
        ("Module", "Verification Milestone Item", "Done (✓)", "Date & Tester Initials"),
        ("Module 0", "Verify GET /api/health returns status 'ok'", "[   ]", ""),
        ("Module 0", "Verify invalid login credentials rejected with error alert", "[   ]", ""),
        ("Module 0", "Verify Super Admin, Checker, and Maker logins succeed", "[   ]", ""),
        ("Module 1", "Verify Content Maker blocked from /users (HTTP 403)", "[   ]", ""),
        ("Module 1", "Verify Super Admin can create Maker & Checker accounts", "[   ]", ""),
        ("Module 1", "Verify Super Admin self-deletion is prevented", "[   ]", ""),
        ("Module 2", "Verify Media Library modal loads and categorizes uploads", "[   ]", ""),
        ("Module 2", "Verify 4.5 MB file size limit and MIME type validation", "[   ]", ""),
        ("Module 3", "Verify universal header updates with logo & bilingual titles", "[   ]", ""),
        ("Module 3", "Verify universal footer contact & copyright information", "[   ]", ""),
        ("Module 4", "Verify mega-menu tree hierarchy expands and contracts", "[   ]", ""),
        ("Module 4", "Verify node reordering (up/down) and undo/redo buttons", "[   ]", ""),
        ("Module 5", "Verify Hero Carousel slide text & image updates", "[   ]", ""),
        ("Module 5", "Verify Announcements tab displays PDF badges and file sizes", "[   ]", ""),
        ("Module 6", "Verify Yerwada Open Jail facility profile & statistics", "[   ]", ""),
        ("Module 7", "Verify visual TemplateSelectorModal displays 25 layouts", "[   ]", ""),
        ("Module 7", "Verify template dummy data pre-seeding and revert feature", "[   ]", ""),
        ("Module 8", "Verify Maker change submission creates pending revision", "[   ]", ""),
        ("Module 8", "Verify Checker inspects diff & executes approval / rejection", "[   ]", ""),
        ("Module 9", "Verify Audit Logs display immutable records & diff viewer", "[   ]", "")
    ]
    for r_idx, row in enumerate(check_data):
        for c_idx, val in enumerate(row):
            check_tbl.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(check_tbl, col_widths=[1.2, 3.4, 0.9, 1.5], header_bg='0F172A')

    doc.add_page_break()

    # ==========================================
    # ANNEXURE B: TEST LOG TEMPLATE & SEVERITY GUIDE
    # ==========================================
    add_heading_1(doc, "5. Annexure B: Test Log Template & Defect Severity Classification Guide")

    add_heading_2(doc, "B.1 Structured UAT Test Log Table")
    add_body_p(doc, "Testers must record every test execution attempt using the structured format below:")

    log_tbl = doc.add_table(rows=5, cols=9)
    log_headers = ["Test ID", "Module & Step", "Role", "Test Data Entered", "Expected Result", "Actual Result", "Status", "Severity", "Screenshot / Notes"]
    for c_idx, h in enumerate(log_headers):
        log_tbl.cell(0, c_idx).paragraphs[0].text = h
    
    sample_log = [
        ("TC-001", "Mod 0.2", "Public", "Email: bad@test.com, Pass: 123", "Login blocked, red alert shown", "Login blocked with error", "PASS", "—", "screenshot_01.png"),
        ("TC-002", "Mod 1.1", "MAKER", "Navigate to /users", "HTTP 403 Access Denied alert", "Access Denied screen rendered", "PASS", "—", "screenshot_02.png"),
        ("TC-003", "Mod 2.2", "MAKER", "Upload 6.2 MB raw photo", "Upload rejected: exceeds 4.5 MB", "Rejected with error message", "PASS", "—", "screenshot_03.png"),
        ("TC-004", "Mod 8.3", "CHECKER", "Reject revision without reason", "Reject button remains disabled", "Reject button disabled", "PASS", "—", "screenshot_04.png")
    ]
    for r_idx, row in enumerate(sample_log, start=1):
        for c_idx, val in enumerate(row):
            log_tbl.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(log_tbl, col_widths=[0.6, 0.8, 0.7, 1.0, 1.0, 1.0, 0.5, 0.5, 0.7], header_bg='0F172A')

    p_sp5 = doc.add_paragraph()
    p_sp5.paragraph_format.space_before = Pt(8)
    p_sp5.paragraph_format.space_after = Pt(8)

    add_heading_2(doc, "B.2 Defect Severity Classification Guide")
    add_body_p(doc, "When logging failed test cases, assign defect severity according to the following strict criteria:")

    sev_tbl = doc.add_table(rows=5, cols=3)
    sev_data = [
        ("Severity Level", "Definition & Impact", "Concrete Examples from Codebase"),
        (
            "Blocker / Critical",
            "Total failure of a core system workflow; data loss; security bypass; unhandled server crash (HTTP 500); inability to authenticate or proceed.",
            "• Super Admin unable to log in to /login.\n• Maker save crashes API server.\n• Maker directly publishes to live DB without Checker approval.\n• Prisma transaction lock during menu update."
        ),
        (
            "Major",
            "Significant functionality failure where a primary feature is inoperable, but a temporary workaround exists or other modules remain testable.",
            "• Live preview iframe fails to receive PREVIEW_UPDATE messages.\n• Phonetic transliteration suggestions fail to pop up.\n• PDF document fails to download from announcements tab.\n• Revert layout button fails to restore archived data."
        ),
        (
            "Minor",
            "Non-critical defect where the core workflow succeeds, but secondary behavior or data presentation is suboptimal.",
            "• Undo history jumps two steps instead of one.\n• Search filter in user table is case-sensitive.\n• Icon picker modal displays missing icon placeholder.\n• Marathi date formatting displays Latin numerals instead of Devanagari."
        ),
        (
            "Cosmetic",
            "Visual, styling, or typographic inconsistency that has no impact on system functionality or data integrity.",
            "• Minor pixel misalignment in header emblem border.\n• Trailing whitespace in footer copyright statement.\n• Animation transition in hero carousel slightly exceeds 5.0 seconds.\n• Button hover color shade mismatch."
        )
    ]
    for r_idx, row in enumerate(sev_data):
        for c_idx, val in enumerate(row):
            sev_tbl.cell(r_idx, c_idx).paragraphs[0].text = val
    style_table(sev_tbl, col_widths=[1.3, 2.5, 3.0], header_bg='0F172A')

    output_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "MahaPrisons_Testing_Guide.docx")
    doc.save(output_path)
    print(f"Document successfully created at: {output_path}")

if __name__ == "__main__":
    build_document()

