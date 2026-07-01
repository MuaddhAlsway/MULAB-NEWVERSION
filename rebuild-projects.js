import fs from 'fs';

// Read the file
const content = fs.readFileSync('src/app/data/projects.ts', 'utf-8');

// Step 1: Extract interface
const interfaceEnd = content.indexOf('export const projects: Project[] = [');
const interfacePart = content.substring(0, interfaceEnd);

// Step 2: Extract everything after projects array
const arrayEnd = content.lastIndexOf('];') + 2;
const footerPart = content.substring(arrayEnd);

// Step 3: Find all project objects between the opening and closing of the projects array
const arrayStart = interfaceEnd + 'export const projects: Project[] = ['.length;
const projectsRawStr = content.substring(arrayStart, arrayEnd - 2).trim();

// Step 4: Split by project using a more reliable method
// Find all { id: and count braces to determine object boundaries
let projects = [];
let depth = 0;
let current = '';
let inFirstBrace = false;

for (let i = 0; i < projectsRawStr.length; i++) {
    const char = projectsRawStr[i];
    
    if (char === '{') {
        depth++;
        if (depth === 1) inFirstBrace = true;
    } else if (char === '}') {
        depth--;
        if (depth === 0 && inFirstBrace) {
            current += char;
            projects.push(current.trim());
            current = '';
            inFirstBrace = false;
            continue;
        }
    }
    
    if (inFirstBrace) current += char;
}

console.log(`Found ${projects.length} projects\n`);

// Step 5: Extract project info for matching
const projectsInfo = projects.map((proj, idx) => {
    const idMatch = proj.match(/id:\s*(\d+)/);
    const nameMatch = proj.match(/name:\s*['"]([^'"]+)['"]/);
    const categoryMatch = proj.match(/category:\s*['"]([^'"]+)['"]/);
    return {
        index: idx,
        oldId: idMatch ? parseInt(idMatch[1]) : null,
        name: nameMatch ? nameMatch[1] : 'Unknown',
        oldCategory: categoryMatch ? categoryMatch[1] : 'unknown',
        fullProject: proj
    };
});

// Log all projects found
console.log('=== PROJECTS FOUND ===');
projectsInfo.forEach(p => {
    console.log(`Index ${p.index}: ID ${p.oldId} - ${p.name} (${p.oldCategory})`);
});

// Step 6: Define target list
const targetList = [
    { id: 1, name: 'TRQ Studio', category: 'fullstack' },
    { id: 2, name: 'Mesaha Lakum', category: 'fullstack' },
    { id: 3, name: 'TD Logistics', category: 'fullstack' },
    { id: 4, name: 'Notes API', category: 'purebackend' },
    { id: 5, name: 'Auth Backend', category: 'purebackend' },
    { id: 6, name: 'CarRentLab', category: 'htmlcssjs' },
    { id: 7, name: 'SkillNest', category: 'htmlcssjs' },
    { id: 8, name: 'QuickBlog', category: 'fullstack' },
    { id: 9, name: 'HealthCare', category: 'htmlcssjs' },
    { id: 10, name: 'Adusity', category: 'fullstack' },
    { id: 11, name: 'Netflix Clone', category: 'fullstack' },
    { id: 12, name: 'Disney+ Clone', category: 'htmlcssjs' },
    { id: 13, name: 'Gemini Clone', category: 'htmlcssjs' },
    { id: 14, name: 'Riyadah', category: 'htmlcssjs' },
    { id: 15, name: 'Coffee Cherry', category: 'htmlcssjs' },
    { id: 16, name: 'Adidas Clone', category: 'htmlcssjs' },
    { id: 17, name: 'Book Store', category: 'htmlcssjs' },
    { id: 18, name: 'Alert Fashion', category: 'htmlcssjs' },
    { id: 19, name: 'Apple Clone', category: 'htmlcssjs' },
    { id: 20, name: 'Ford Clone', category: 'htmlcssjs' },
    { id: 21, name: 'Pizza Clone', category: 'htmlcssjs' },
    { id: 22, name: 'ArchDot Studio', category: 'htmlcssjs' },
    { id: 23, name: 'Construction Clone', category: 'htmlcssjs' },
    { id: 24, name: 'Walthome Clone', category: 'htmlcssjs' },
    { id: 25, name: 'Job Portal', category: 'htmlcssjs' },
    { id: 26, name: 'Amazon Clone', category: 'htmlcssjs' },
    { id: 27, name: 'PayPal Clone', category: 'htmlcssjs' },
    { id: 28, name: 'British Council Clone', category: 'htmlcssjs' },
    { id: 29, name: 'Airbnb Clone', category: 'htmlcssjs' },
    { id: 30, name: 'H&M Clone', category: 'htmlcssjs' },
    { id: 31, name: 'Udemy Clone', category: 'htmlcssjs' },
    { id: 32, name: 'Uber Clone', category: 'htmlcssjs' },
    { id: 33, name: 'Wego Clone', category: 'htmlcss' },
    { id: 34, name: 'Netflix Clone UI', category: 'htmlcss' },
    { id: 35, name: 'Spotify Clone', category: 'htmlcss' },
    { id: 36, name: 'Facebook Clone', category: 'htmlcssjs' },
    { id: 37, name: 'LinkedIn Clone', category: 'htmlcssjs' },
    { id: 38, name: 'Online Calendar', category: 'c' },
    { id: 39, name: 'Student Management System', category: 'c' },
    { id: 40, name: 'Deep Dive by C - BookStore', category: 'c' }
];

// Step 7: Create mapping - match by name (fuzzy)
const mapping = [];
const usedIndices = new Set();

// Filter out non-project entries (filter categories and entries without proper structure)
const validProjects = projectsInfo.filter(p => p.oldId !== null && p.oldId < 50);

console.log('\n=== VALID PROJECTS TO CONSIDER ===');
validProjects.forEach(p => {
    console.log(`  ID ${p.oldId}: ${p.name}`);
});

for (const target of targetList) {
    // Try exact name match first
    let found = validProjects.findIndex(p => {
        const projNameClean = p.name.toLowerCase().trim();
        const targetNameClean = target.name.toLowerCase().trim();
        return projNameClean === targetNameClean && !usedIndices.has(p.index);
    });
    
    // Try handling KOFFEE CHERRY vs Coffee Cherry
    if (found === -1 && target.name.toLowerCase().includes('coffee')) {
        found = validProjects.findIndex(p => {
            const projNameClean = p.name.toLowerCase();
            return (projNameClean.includes('coffe') || projNameClean.includes('koffee')) && !usedIndices.has(p.index);
        });
    }
    
    // Try keyword matching
    if (found === -1) {
        const keywords = target.name.toLowerCase().split(' ').filter(k => k.length > 2);
        found = validProjects.findIndex(p => {
            const projNameClean = p.name.toLowerCase();
            // Check if primary keyword is in the project name
            return keywords.length > 0 && keywords.some(kw => projNameClean.includes(kw)) && !usedIndices.has(p.index);
        });
    }
    
    if (found !== -1) {
        usedIndices.add(validProjects[found].index);
        mapping.push({
            sourceIndex: validProjects[found].index,
            targetId: target.id,
            targetName: target.name,
            targetCategory: target.category,
            project: validProjects[found].fullProject,
            oldName: validProjects[found].name
        });
        console.log(`✓ MAPPED: "${validProjects[found].name}" → ID ${target.id} (${target.category})`);
    } else {
        console.log(`✗ NOT FOUND: "${target.name}"`);
    }
}

console.log(`\n=== MAPPING COMPLETE ===`);
console.log(`Mapped: ${mapping.length}/${targetList.length} projects`);
console.log(`Unmapped projects: ${projectsInfo.filter(p => !usedIndices.has(p.index)).map(p => p.name).join(', ')}`);

// Step 8: Build new projects array with correct IDs and categories
let newProjectsArray = [];
for (const m of mapping) {
    let updatedProject = m.project;
    
    // Replace id
    updatedProject = updatedProject.replace(/id:\s*\d+,/, `id: ${m.targetId},`);
    
    // Replace category
    updatedProject = updatedProject.replace(/category:\s*['"][^'"]+['"]/, `category: '${m.targetCategory}'`);
    
    newProjectsArray.push('  ' + updatedProject);
}

// Step 9: Build the final file
const newContent = interfacePart + 
    'export const projects: Project[] = [\n' +
    newProjectsArray.join(',\n') +
    ',\n' +
    '];\n\n\n' +
    footerPart;

// Step 10: Write the file
fs.writeFileSync('src/app/data/projects.ts', newContent, 'utf-8');
console.log('\n✓ File updated successfully!');
console.log(`New file has ${mapping.length} projects with sequential IDs 1-${mapping.length}`);
