// import { ethers } from 'ethers'

// const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com")
// const contractAddr = "0x851b728e568c9e10ab8007f27a525fbbed29b259"
// const ABI = ["function tokenURI(uint256 tokenId) public view returns (string)"]
// const contract = new ethers.Contract(contractAddr, ABI, provider)

// const tokenId = 1 // essaie aussi 0, 2, etc. si 1 ne marche pas

// contract.tokenURI(tokenId).then(uri => {
//   console.log(`✅ tokenURI(${tokenId}) = ${uri}`)
// }).catch(err => {
//   console.error("❌ Erreur :", err.message)
// })

import fs from 'fs'
import fetch from 'node-fetch'

const CID = 'bafybeicoypineadqd5eiyssk523jqryga6z6xkwm7bxslhcc7qypyjtfpu'
const MAX_TOKENS = 4460 // ← adapte à ton nombre total de NFTs
const BASE_URL = `https://ipfs.io/ipfs/${CID}`

const nftAssets = {}

async function fetchMetadata(id) {
  const url = `${BASE_URL}/${id}`
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()

    // Parse les traits
    const traits = {}
    for (const attr of json.attributes || []) {
      traits[attr.trait_type.toLowerCase()] = attr.value
    }

    nftAssets[id] = traits
    console.log(`✅ ${id}`, traits)
  } catch (e) {
    console.warn(`❌ ${id}: ${e.message}`)
  }
}

async function main() {
  for (let i = 4443; i <= MAX_TOKENS; i++) {
    await fetchMetadata(i)
  }

  fs.writeFileSync('nftAssets.json', JSON.stringify(nftAssets, null, 2))
  console.log('🎉 Fichier nftAssets.json généré.')
}

main()
