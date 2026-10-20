import { initTRPC } from "@trpc/server";
import _ from 'lodash'
import z from "zod";



const ideas = _.times(100, (i)=>({
      nick: `cool-idea-nick-${i}`,
      name: `Idea ${i}`,
      description: `description for idea ${i}`,
      text:_.times(100,(j)=>{
       return `<p> Text paragraph ${j} if idea ${i}... </p>`
      }).join('')
    }))

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas:ideas.map(item=>{
      return _.pick(item, ['nick', 'name', 'description'])
    }) };
  }),
  getIdea:trpc.procedure.input(
    z.object({
      ideaNick:z.string(),
    }),
  ).query(({input})=>{
    const idea= ideas.find((idea)=>{
      return idea.nick === input.ideaNick
    })

    return {idea:idea || null}
  })


});


export type TrpcRouter=  typeof trpcRouter;