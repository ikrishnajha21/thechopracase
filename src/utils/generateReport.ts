/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function downloadConfidentialReport() {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CONFIDENTIAL DOSSIER: THE CHOPRA CASE (1978)</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;600;800&display=swap');
    
    body {
      background-color: #fcfaf7;
      color: #1a1512;
      font-family: "Courier Prime", monospace;
      margin: 0;
      padding: 40px;
      line-height: 1.5;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #3a2e26;
      padding: 40px;
      background: #fcfaf7;
      position: relative;
    }

    /* Watermark stamp */
    .watermark {
      position: absolute;
      top: 15%;
      right: 10%;
      border: 4px double #b91c1c;
      color: #b91c1c;
      font-size: 24px;
      font-weight: bold;
      font-family: 'Inter', sans-serif;
      padding: 10px 20px;
      transform: rotate(12deg);
      opacity: 0.85;
      letter-spacing: 3px;
      border-radius: 4px;
      pointer-events: none;
    }

    header {
      border-bottom: 2px solid #1a1512;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      font-size: 12px;
      margin-bottom: 20px;
      border-bottom: 1px dashed #3a2e26;
      padding-bottom: 15px;
    }

    .meta-item span {
      display: block;
    }

    .meta-label {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 9px;
      color: #7c6250;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    h1 {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 26px;
      margin: 5px 0;
      letter-spacing: -1px;
    }

    h2 {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      border-bottom: 1px solid #1a1512;
      padding-bottom: 5px;
      margin-top: 35px;
      color: #1a1512;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    p {
      font-size: 13px;
      text-align: justify;
    }

    .bullet-list {
      margin-top: 10px;
      padding-left: 20px;
    }

    .bullet-list li {
      font-size: 13px;
      margin-bottom: 8px;
    }

    footer {
      margin-top: 50px;
      border-top: 1px solid #1a1512;
      padding-top: 15px;
      font-size: 10px;
      color: #7c6250;
      text-align: center;
    }

    @media print {
      body {
        padding: 0;
        background: #fff;
      }
      .container {
        border: none;
        padding: 0;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="watermark">DECLASSIFIED</div>

    <header>
      <div class="meta-label">GOVERNMENT OF INDIA // MINISTRY OF HOME AFFAIRS</div>
      <h1>CRIMINAL INVESTIGATION REPORT</h1>
      <div class="meta-label" style="margin-top: 5px;">CASE ID: 1978_DELHI_08</div>
    </header>

    <div class="meta-grid">
      <div class="meta-item">
        <span class="meta-label">SUBJECT OF FILE</span>
        <span style="font-weight: bold;">Sanjay & Geeta Chopra Kidnapping (Ranga-Billa Case)</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">DATE OF RECORDING</span>
        <span>July 02, 2026 // HISTORICAL RE-COMPILATION</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">PRIMARY SUSPECTS</span>
        <span>Jasbir Singh (Billa) & Kuljeet Singh (Ranga)</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">FINAL JUDICIAL RESULT</span>
        <span>Capital Punishment executed Jan 31, 1982 at Tihar Jail</span>
      </div>
    </div>

    <h2>1. CRIME OVERVIEW (AUGUST 26, 1978)</h2>
    <p>
      On the afternoon of August 26, 1978, teen siblings Geeta Chopra (16) and Sanjay Chopra (14) left their naval officer home to participate in a youth radio broadcast scheduled at All India Radio on Parliament Street. While hitchhiking near the Dhaula Kuan intersection, they were lured into a stolen grey Fiat 1100 driven by habitual criminals Ranga and Billa.
    </p>

    <h2>2. FORENSIC EVIDENCE AND CAPTURE</h2>
    <p>
      The stolen vehicle was modified to prevent rear door handle activation, creating a steel trap. Following an intensive multi-agency forensic sweep spanning 72 hours, the bodies of the siblings were discovered in the secluded Upper Ridge Forest on August 29. 
    </p>
    <p>
      A nationwide railway watch bulletin led directly to their high-profile arrest. Alert military soldiers on leave spotted Ranga and Billa on the moving Kalka Mail train, resulting in their bloodless apprehension.
    </p>

    <h2>3. COURT PROCEEDINGS AND SENTENCING</h2>
    <p>
      The fast-track trial commenced in March 1979 in the Sessions Court of Delhi. Evidence presented included blood velocity metrics, footprint matches, and stolen vehicle registration tags.
    </p>
    <ul class="bullet-list">
      <li><strong>April 07, 1979:</strong> Sessions Court awards the death sentence, citing exceptional cruelty.</li>
      <li><strong>April 1980:</strong> Delhi High Court upholds the conviction and sentencing.</li>
      <li><strong>April 1981:</strong> The Supreme Court of India dismisses the final criminal appeal.</li>
      <li><strong>January 31, 1982:</strong> Hanging executed successfully at Tihar Jail.</li>
    </ul>

    <h2>4. COMPREHENSIVE TIMELINE OF MILESTONES</h2>
    <p>
      The case prompted fundamental revisions to public street safety protocols, immediate reforms in military/civic tracking cooperation, and changed legal procedures surrounding the handling of juvenile witness testimonials in the Indian Judicial System.
    </p>

    <footer>
      CONFIDENTIAL CASE FILE • RESEARCH COMPILATION APPROVED BY THE SPECIAL COMMISSION OF ENQUIRY • DO NOT DUPLICATE WITHOUT AUTHORIZATION
    </footer>
  </div>

  <script>
    // Prompt print dialog when opened as standalone
    window.onload = function() {
      // Gentle delayed auto-trigger or manual trigger is available
    }
  </script>
</body>
</html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "CONFIDENTIAL_CASE_MHA_1978_REPORT.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
