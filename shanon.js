

I = (x) => Math.log2(1/x)
E = (x) => x.reduce((a,e)=>a+e[1]*I(e[1]),0)

 freq = (x) =>{
   let hash = {};
  
   [...x].forEach(c=>hash[c] = 1+(hash[c]||0))
   hash = Object.entries(hash).sort((a,b)=>b[1]-a[1])
   let sum = hash.reduce((a,b)=>a+b[1],0);
   hash = hash.map(x=>[x[0],x[1]/sum,Math.ceil(I(x[1]/sum))])
 
   let run_sum = 0;
   for(let i in hash){
     let bit_count = hash[i][2];
     let shanon_code = run_sum.toString(2).slice(2,2+bit_count).padEnd(bit_count,'0');
     hash[i][3] = shanon_code;
     run_sum+=hash[i][1];
   }

  hash = Object.fromEntries(hash.map(e => [e[0], e[3]]));
  
  return hash;
 }


encode  = (text,table)=>{
  let code = [];
  for(let c of text)
   code.push(table[c])

 return code.join('')
}

str_to_bytes = (str)=>{
  let byte_count = Math.ceil(str.length/8);
  let buffer  = new Uint8Array(byte_count);
  for(let i = 0; i < byte_count; i++)
   buffer[i] = parseInt(str.slice(i*8,i*8+8).padEnd(8,'0'),2)
   return buffer;
}

bytes_to_str = (bytes,len)=>{
  let str = '';
  for(let byte of bytes)
   str += byte.toString(2).padStart(8,'0') 
 return str.slice(0,len)
}

decode = (code,table)=>{
  let text = [];
  let rev_table = {}
  let shanon_code = '';

for(let key in table)
 rev_table[table[key]] = key;
for(let bit of code){
  shanon_code+=bit
  if(shanon_code in rev_table){
   text+=rev_table[shanon_code]
   shanon_code = ''
  } 
}

  return text;
}

 text = 'labas vakaras ka tu'
 table = freq(text)
 encoded = encode(text,table)

/*

table entry

8bits_ascii code_len_16bits 

*/
