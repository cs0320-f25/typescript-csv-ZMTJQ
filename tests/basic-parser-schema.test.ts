import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import z from 'zod'


const STUDENTS_CSV_PATH = path.join(__dirname, "../data/students.csv");
const BROKEN_EMAIL_STUDENTS_CSV_PATH = path.join(__dirname, "../data/broken_students.csv");
const BROKEN_NAME_STUDENTS_CSV_PATH = path.join(__dirname, "../data/broken_name_students.csv");
const BROKEN_CREDIT_STUDENTS_CSV_PATH = path.join(__dirname, "../data/broken_credit_students.csv");
const EMPTY_COLUMN_STUDENTS_CSV_PATH = path.join(__dirname, "../data/empty_column_students.csv");
const CAR_CSV_PATH = path.join(__dirname, "../data/cars.csv");
const CAR_EXTRA_CSV_PATH = path.join(__dirname, "../data/cars_extra.csv");

/*----------Task C Tests----------*/

// Notes: I won't be testing the fall back string[][]
// behavior here since the tests in basic-parser.test.ts
// already do so (they have the same behavior as before)

const studentRowSchema =
  z.tuple([z.string(), z.coerce.number(), z.email()])
  .transform( arr => ({name: arr[0], credits: arr[1], email: arr[2]}));

type StudentRow = z.infer<typeof studentRowSchema>;

// Test 1: tests a simple, correct schema organized csv input
test("parses CSV rows with schema", async () => {
    const results = await parseCSV<StudentRow>(STUDENTS_CSV_PATH, studentRowSchema);
    if (results instanceof z.ZodError) {
        console.log("This test shouldn't error.") // LLMs suggest throwing here
    }
    else {
        expect(results).toEqual([
            { name: "Zach Quitkin", credits: 20, email: "zachary_quitkin@brown.edu" },
            { name: "Chaz Quitkin", credits: 2, email: "chaz_quitkin@brown.edu" },
        ]);

        // Check types at compile time to further prove schema worked:
        const first: StudentRow = results[0];
        const second: StudentRow = results[1];
        console.log(first.name, first.credits, first.email);
        console.log(second.name, second.credits, second.email);
    }
});

// Test 2: tests if error is returned when email is bad
test("parses CSV rows with bad email syntax", async () => {
  const results = await parseCSV<StudentRow>(BROKEN_EMAIL_STUDENTS_CSV_PATH, studentRowSchema);
  expect(results).toBeInstanceOf(z.ZodError);
});

// Test 3: tests if error is returned when name is bad
test("parses CSV rows with bad email name", async () => {
  const results = await parseCSV<StudentRow>(BROKEN_NAME_STUDENTS_CSV_PATH, studentRowSchema);
  expect(results).toBeInstanceOf(z.ZodError);
});

// Test 4: tests if error is returned when credit is bad
test("parses CSV rows with bad course count syntax", async () => {
  const results = await parseCSV<StudentRow>(BROKEN_CREDIT_STUDENTS_CSV_PATH, studentRowSchema);
  expect(results).toBeInstanceOf(z.ZodError);
});

// Test 5: tests if error is returned when a column is empty
// Note: the empty column actually has to be the email slot,
// bc both the name and credit will change the empty slot
// to something that works ("" or 0). Could be edited in the next
// Spring
test("parses CSV rows with a column empty", async () => {
  const results = await parseCSV<StudentRow>(EMPTY_COLUMN_STUDENTS_CSV_PATH, studentRowSchema);
  expect(results).toBeInstanceOf(z.ZodError);
});

const carSchema =
  z.tuple([z.string(), z.coerce.number(), z.string()])
  .transform( arr => ({brand: arr[0], year: arr[1], color: arr[2]}));

type CarRow = z.infer<typeof carSchema>;

// Test 6: tests a different simple, correct schema organized csv input
test("parses CSV rows with schema", async () => {
    const results = await parseCSV<CarRow>(CAR_CSV_PATH, carSchema);
    if (results instanceof z.ZodError) {
        console.log("This test shouldn't error.")
    }
    else{
        expect(results).toEqual([
            { brand: "Volvo", year: 2020, color: "Blue" },
            { brand: "Toyota", year: 2008, color: "Grey"  },
            { brand: "Subaru", year: 2013, color: "Ash"  },
        ]);

        // You can also check types at compile time:
        const first: CarRow = results[0];
        const second: CarRow = results[1];
        const third: CarRow = results[2];
        console.log(first.brand, first.year, first.color);
        console.log(second.brand, second.year, second.color);
        console.log(third.brand, third.year, third.color);
    }
});

// Test 7: tests when there's an extra column in a row. returns error
test("parses CSV rows with schema", async () => {
    const results = await parseCSV<CarRow>(CAR_EXTRA_CSV_PATH, carSchema);
    expect(results).toBeInstanceOf(z.ZodError);
});

// Test 8: tests a simple, correct schema organized csv input
test("parses CSV rows with schema", async () => {
    const results = await parseCSV(STUDENTS_CSV_PATH, undefined);
    if (results instanceof z.ZodError) {
        console.log("This test shouldn't error.") // LLMs suggest throwing here
    }
    else {
        expect(results[0]).toEqual(["Zach Quitkin", "20", "zachary_quitkin@brown.edu"]);
        expect(results[1]).toEqual(["Chaz Quitkin", "2", "chaz_quitkin@brown.edu"]);    

        // Check types at compile time to further prove undefined 
        // schema was ignored
        const first: string[] = results[0];
        const second: string[] =  results[1];
        console.log(first[0], first[1], first[2]);
        console.log(second[0], second[1], second[2]);
    }
});