import pool from "./pool"

/* -------------------- CUSTOMERS -------------------- */
async function getAllCustomers() {
  const { rows } = await pool.query("SELECT * FROM customers ORDER BY created_at DESC");
  return rows;
}

async function getCustomerById(id) {
  const { rows } = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
  return rows[0];
}

async function insertCustomer(full_name, phone, address, guarantor_name, guarantor_phone) {
  await pool.query(
    `INSERT INTO customers (full_name, phone, address, guarantor_name, guarantor_phone) 
     VALUES ($1, $2, $3, $4, $5)`,
    [full_name, phone, address, guarantor_name, guarantor_phone]
  );
}

async function deleteCustomer(id) {
  await pool.query("DELETE FROM customers WHERE id = $1", [id]);
}

/* -------------------- LOANS -------------------- */
async function getLoansByCustomer(customerId) {
  const { rows } = await pool.query(
    "SELECT * FROM loans WHERE customer_id = $1 ORDER BY created_at DESC",
    [customerId]
  );
  return rows;
}

async function insertLoan(customer_id, principal_amount, total_amount_due, start_date, due_date) {
  await pool.query(
    `INSERT INTO loans (customer_id, principal_amount, total_amount_due, start_date, due_date) 
     VALUES ($1, $2, $3, $4, $5)`,
    [customer_id, principal_amount, total_amount_due, start_date, due_date]
  );
}

async function markLoanAsPaid(loanId) {
  await pool.query(
    "UPDATE loans SET status = 'paid' WHERE id = $1",
    [loanId]
  );
}

/* -------------------- PAYMENTS -------------------- */
async function getPaymentsByLoan(loanId) {
  const { rows } = await pool.query(
    "SELECT * FROM payments WHERE loan_id = $1 ORDER BY payment_date ASC",
    [loanId]
  );
  return rows;
}

async function insertPayment(loan_id, amount_paid, payment_date) {
  await pool.query(
    `INSERT INTO payments (loan_id, amount_paid, payment_date) 
     VALUES ($1, $2, $3)`,
    [loan_id, amount_paid, payment_date]
  );
}
