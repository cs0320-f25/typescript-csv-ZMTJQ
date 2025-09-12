import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import z from 'zod'


const STUDENTS_CSV_PATH = path.join(__dirname, "../data/students.csv");
const BROKEN_EMAIL_STUDENTS_CSV_PATH = path.join(__dirname, "../data/broken_students.csv");
const BROKEN_NAME_STUDENTS_CSV_PATH = path.join(__dirname, "../data/broken_name_students.csv");
const BROKEN_CREDIT_STUDENTS_CSV_PATH = path.join(__dirname, "../data/broken_credit_students.csv");
const EMPTY_COLUMN_STUDENTS_CSV_PATH = path.join(__dirname, "../data/empty_column_students.csv");
/*----------Task C Tests----------*/

const studentRowSchema =
  z.tuple([z.string(), z.coerce.number(), z.email()])
  .transform( arr => ({name: arr[0], credits: arr[1], email: arr[2]}));

type StudentRow = z.infer<typeof studentRowSchema>;

// Test 1: tests if a simple, correct schema organized csv 
test("parses CSV rows with schema", async () => {
  const results = await parseCSV<StudentRow>(STUDENTS_CSV_PATH, studentRowSchema);
    if (results instanceof z.ZodError) {
        throw new Error("Schema validation failed: " + results.message);
    }
  expect(results).toEqual([
    { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
    { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
  ]);

  // You can also check types at compile time:
  const first: StudentRow = results[0];
  console.log(first.name, first.credits, first.email);
});

// Test 2: tests if error is thrown when email is bad
test("parses CSV rows with bad email syntax", async () => {
  const results = await parseCSV<StudentRow>(BROKEN_EMAIL_STUDENTS_CSV_PATH, studentRowSchema);
    if (results instanceof z.ZodError) {
        expect(results).not.toEqual([
            { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
            { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
        ]);
        console.log("Schema Email Validation failed")
    }
    else { 
        expect(results).toEqual([
            { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
            { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
        ]);
        // You can also check types at compile time:
        const first: StudentRow = results[0];
        console.log(first.name, first.credits, first.email);
    }
});

// Test 3: tests if error is thrown when name is bad
test("parses CSV rows with bad email name", async () => {
  const results = await parseCSV<StudentRow>(BROKEN_NAME_STUDENTS_CSV_PATH, studentRowSchema);
    if (results instanceof z.ZodError) {
        expect(results).not.toEqual([
            { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
            { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
        ]);
        console.log("Schema Name Validation failed")
    }
    else { 
        expect(results).toEqual([
            { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
            { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
        ]);
        // You can also check types at compile time:
        const first: StudentRow = results[0];
        console.log(first.name, first.credits, first.email);
    }
});

// Test 4: tests if error is thrown when credit is bad
test("parses CSV rows with bad course count syntax", async () => {
  const results = await parseCSV<StudentRow>(BROKEN_CREDIT_STUDENTS_CSV_PATH, studentRowSchema);
    if (results instanceof z.ZodError) {
        expect(results).not.toEqual([
            { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
            { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
        ]);
        console.log("Schema Credit Validation failed")
    }
    else { 
        expect(results).toEqual([
            { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
            { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
        ]);
        // You can also check types at compile time:
        const first: StudentRow = results[0];
        console.log(first.name, first.credits, first.email);
    }
});

// Test 5: tests if error is thrown when a column is empty
test("parses CSV rows with a column empty", async () => {
  const results = await parseCSV<StudentRow>(EMPTY_COLUMN_STUDENTS_CSV_PATH, studentRowSchema);
    if (results instanceof z.ZodError) {
        expect(results).not.toEqual([
            { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
            { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
        ]);
        console.log("Empty Column, Schema Validation failed")
    }
    else { 
        expect(results).toEqual([
            { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
            { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
        ]);
        // You can also check types at compile time:
        const first: StudentRow = results[0];
        console.log(first.name, first.credits, first.email);
    }
});
