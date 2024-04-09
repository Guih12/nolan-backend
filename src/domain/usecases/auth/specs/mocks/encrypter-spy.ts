import { Encrypter } from "@/adapters/lib/encrypter"
import crypto from "crypto"

export class EcrypterSpy implements Encrypter {
  calssCount = 0
  async encrypt(value: string): Promise<string> {
    this.calssCount++
    return crypto.createHash("md5").update(value).digest("hex") 
  }
}
